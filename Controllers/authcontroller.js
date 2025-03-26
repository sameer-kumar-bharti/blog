const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require('../Models/user');
const jwt = require("jsonwebtoken");

const validateSignUp = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('password is required.'),
];

exports.SignUp = [
    validateSignUp,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    // comment
    const {name, email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password:hashPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    }catch(err){
        return res.status(500).json({ message: err });
    }
    
}];

const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('password is required.'),
];

exports.Login = [
    validateLogin,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {email, password} = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            req.session.user_data = {
                user_id: existingUser.id,
            };
            console.log('login sess', req.session.user_data);
            const token = jwt.sign({ userId: existingUser.id, username: existingUser.name }, process.env.JWT_SECRET, {
                expiresIn: '1h' // Token will expire in 1 hour
            });
            return res.status(201).json({ message: 'User logged in successfully',token:token });
        } catch (error) {
            console.error('Login Error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
];
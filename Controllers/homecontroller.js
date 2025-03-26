const express = require('express')

exports.Test = (req,res)=>{
    res.status(200).json({ message: 'Home' });
}
const {body, validationResult} = require('express-validator');
const Category = require('../Models/category');


const validateCategory = [
    body('title')
        .notEmpty()
        .withMessage('Title is required.'),
    body('url_key')
        .notEmpty()
        .withMessage('Url key is required.'),
    body('meta_title')
        .notEmpty()
        .withMessage('Meta title is required.'),
    body('meta_description')
        .notEmpty()
        .withMessage('Meta description is required.'),
];

exports.AddCategory = [
    validateCategory,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const {title, url_key, meta_title, meta_description} = req.body;
    const existingCategory = await Category.findOne({url_key});
    if(existingCategory){
        res.status(400).json({message:"Category Already exist"});
    }

    const newCategoey = new Category({
        title,
        url_key,
        meta_title,
        meta_description,
    });
    await newCategoey.save();
    res.status(201).json({message:"Category has been created successfully !"});
}];

exports.UpdateCategory = [
    validateCategory,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try{
        const {title, url_key, meta_title, meta_description} = req.body;
        const existingCategory = await Category.findOne({url_key});
        if(existingCategory){
            existingCategory.title;
            existingCategory.url_key;
            existingCategory.meta_title;
            existingCategory.meta_description;
            await existingCategory.save();
            return res.status(201).json({message:"Category has been updated successfully !"});
        }else{
            return res.status(400).json({message:"Post not found"});
        }
    }catch(err){
        return res.status(500).json({ message: err });
    }
}];

exports.DeleteCategory = [
    async (req, res) => {
    const url_key = req.params.url_key;
    try{
        const existingCategory = await Category.deleteOne({url_key});
        if(existingCategory.deletedCount > 0){
            return res.status(201).json({message:"Category has been deleted successfully !"});
        }else{
            return res.status(400).json({message:"Something went wrong"});
        }
    }catch(err){
        return res.status(500).json({ message: err });
    }
}];

exports.CategoryList = [
    async (req, res) => {
        try{
            const categorylist = await Category.find({ status: "active" });
            return res.status(201).json({result:categorylist,message:"Category List !"});
        }catch(err){
            return res.status(500).json({ message: err });
        }
    }
];


const Post = require('../Models/post');
const {body, validationResult} = require('express-validator');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const validatePost = [
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
    body('image')
        .notEmpty()
        .withMessage('Image is required.'),
    body('featured_image')
        .notEmpty()
        .withMessage('Featured Image is required.'),
    body('content')
        .notEmpty()
        .withMessage('Content is required.'),
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    },
});

exports.AddPost = [
    validatePost,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'featured_image', maxCount: 1 },
    ]),
    async (req, res)=>{ 
        const regularObject = { ...req.body };
        const errors = validationResult(regularObject);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }   
        try{
            const {title, url_key, meta_title, meta_description, image, featured_image, content} = req.body;
            const existingPost = await Post.findOne({url_key});
            console.log('data', req.body);
            if(existingPost){
                return res.status(400).json({message:"Post Already exist"});
            }
            const imagePath = req.files?.image?.[0]?.filename
                    ? `/uploads/${req.files.image[0].filename}`
                    : null;

            const featuredImagePath = req.files?.featured_image?.[0]?.filename
                    ? `/uploads/${req.files.featured_image[0].filename}`
                    : null;
            // if (!req.session?.user?.user_id) {
            //     throw new Error('User is not logged in.');
            // }
            
            const newPost = new Post({
                user_id:1,//req.session.user.user_id,
                title,
                category_id:1,
                url_key,
                meta_title,
                meta_description,
                image: imagePath,
                featured_image: featuredImagePath,
                content,
            });
            const savedPost = await newPost.save();
            return res.status(201).json({message:"post successfully added",'response':savedPost});
        }catch(err){
            console.error('AddPost Error:', err);
            return res.status(500).json({ message: err });
        }
    }
];  
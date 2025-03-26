const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/jwtmiddleware');
const HomeController = require('../Controllers/homecontroller');
const AuthController = require('../Controllers/authcontroller');
const CategoryController = require('../Controllers/categorycontroller');
const PostController = require('../Controllers/postcontroller');
router.get('/', authenticateToken.authenticateToken, HomeController.Test);
router.post('/signup', AuthController.SignUp);
router.post('/login', AuthController.Login);
router.post('/add-category', authenticateToken.authenticateToken, CategoryController.AddCategory);
router.get('/category-list', authenticateToken.authenticateToken, CategoryController.CategoryList);
router.post('/update-category', authenticateToken.authenticateToken, CategoryController.UpdateCategory);
router.get('/delete-category/:url_key', authenticateToken.authenticateToken, CategoryController.DeleteCategory);
router.post('/add-post', authenticateToken.authenticateToken, PostController.AddPost);

module.exports = router
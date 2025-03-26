
const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || '34521';
// Middleware to verify the JWT
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    // Remove 'Bearer ' prefix
    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
};
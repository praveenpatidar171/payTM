const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = expressAsyncHandler(async (req, res, next) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        res.status(400);
        throw new Error(`Not authorised No token`)
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(400);
        throw new Error('Authorization failed Token failed')
    }
});


module.exports = protect;
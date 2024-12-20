const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcryptjs');
const zod = require('zod');
const Account = require('../models/accountModel');

const signUpbody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
})

const SignUP = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please send all the required fields');
    }

    const { success } = signUpbody.safeParse(req.body);
    console.log(success);
    if (!success) {
        res.status(400);
        throw new Error('Wrong Inputs');
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(400);
            throw new Error('User already exist, please log in');
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
            }

            const user = await User.create(newUser);
            if (user) {

                await Account.create({
                    userId: user._id,
                    balance: 1 + Math.random() * 10000,
                })

                res.status(200).json({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    token: generateToken(user._id),
                })
            }
            else {
                res.status(400);
                throw new Error('User not created!!')
            }
        }


    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const LoginBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
const Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please send all the fields');
    }

    const { success } = LoginBody.safeParse(req.body);

    if (!success) {
        res.status(400);
        throw new Error('Wrong inputs');
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const ispassword = await bcrypt.compare(password, user.password);
            if (ispassword) {
                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: generateToken(user._id),
                });
            }
            else {
                res.status(400);
                throw new Error('Wrong Credentials');
            }
        }
        else {
            res.status(400);
            throw new Error('User not exist');
        }

    } catch (error) {
        res.status(400);
        throw new Error('Failed to log In')
    }
});
const UpdateUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.findByIdAndUpdate({ _id: req.user._id }, {
            firstName: firstName,
            lastName: lastName,
            password: hash,
        })

        const finalUser = await User.findById(req.user._id).select('-password');

        if (newUser) {
            res.status(200).json(finalUser);
        }

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }


});

const getUser = asyncHandler(async (req, res) => {
    const keywords = req.query.search ? {
        $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]

    } : {};

    try {
        const users = await User.find({ ...keywords, _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


module.exports = { SignUP, Login, UpdateUser, getUser };
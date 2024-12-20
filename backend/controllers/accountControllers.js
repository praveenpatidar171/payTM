const expressAsyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const mongoose = require("mongoose");

const getBalance = expressAsyncHandler(async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id });
        res.status(200).json(account.balance);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const transferFunds = expressAsyncHandler(async (req, res) => {

    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { to, amount } = req.body;

        if (!to || !amount) {
            await session.abortTransaction();
            res.status(400);
            throw new Error("Please send all the fields");
        }

        const account = await Account.findOne({ userId: req.user._id }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            res.status(400);
            throw new Error("Insufficient balance");
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            res.status(400);
            throw new Error("Invalid Account");
        }

        await Account.updateOne({ userId: req.user._id }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({ message: "transaction successfull" });

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

module.exports = { getBalance, transferFunds };
const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
const connectdb = async () => {

    try {
        const conn = await mongoose.connect(URI);
        console.log(`db connected at: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectdb;
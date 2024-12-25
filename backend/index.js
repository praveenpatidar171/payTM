const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectdb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const cors = require('cors');

const path = require('path');

connectdb();
const PORT = process.env.PORT || 5000;
const app = express();

const _dirname = path.resolve();

app.use(cors());
app.use(express.json());


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
 res.sendFile(path.resolve(_dirname, "frontend", "dist" , "index.html"))
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})


const express = require('express');
const protect = require('../middlewares/authmiddleware');
const { getBalance, transferFunds } = require('../controllers/accountControllers');
const router = express.Router();

router.get('/balance', protect, getBalance);
router.post('/transfer', protect, transferFunds);

module.exports = router;
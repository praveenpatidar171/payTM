const express = require('express');
const { SignUP, UpdateUser, Login, getUser } = require('../controllers/userControllers');
const protect = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/', SignUP);
router.post('/login', Login);
router.put('/update', protect, UpdateUser);
router.get('/', protect, getUser);

module.exports = router;

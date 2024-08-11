const express = require('express');
const { register, login//, confirmEmail
    , getUserProfile } = require('../controllers/user');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
//router.get('/confirm/:token', confirmEmail);
router.get('/profile', getUserProfile); // Add this route if needed

module.exports = router;

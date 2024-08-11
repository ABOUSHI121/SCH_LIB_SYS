const express = require('express');
const { getBorrowedBooks } = require('../controllers/borrow');
const router = express.Router();

router.get('/', getBorrowedBooks);

module.exports = router;

// routes/borrow.js
const express = require('express');
const { lendBook, getBorrowedBooks } = require('../controllers/borrow');
const router = express.Router();

router.post('/', lendBook);
router.get('/', getBorrowedBooks);

module.exports = router;

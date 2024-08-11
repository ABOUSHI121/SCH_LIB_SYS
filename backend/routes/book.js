// routes/book.js

const express = require('express');
const router = express.Router();
const { getAvailableBooks, addBook, getBooks } = require('../controllers/book');

// Route to get available books
router.get('/available', getAvailableBooks);

// Route to add a new book
router.post('/', addBook);

// Route to get all books
router.get('/', getBooks);

module.exports = router;

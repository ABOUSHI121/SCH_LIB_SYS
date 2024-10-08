// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isBorrowed: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

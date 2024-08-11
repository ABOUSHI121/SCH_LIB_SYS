// models/BorrowedBook.js
const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    borrowedDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true }
});

module.exports = mongoose.model('BorrowedBook', borrowedBookSchema);



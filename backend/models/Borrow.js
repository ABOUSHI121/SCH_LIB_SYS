// models/Borrow.js
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
});

module.exports = mongoose.model('Borrow', borrowSchema);

const express = require('express');
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const Student = require('../models/Student');
const router = express.Router();

router.post('/', async (req, res) => {
    const { bookId, studentId } = req.body;
    try {
        const book = await Book.findById(bookId);
        const student = await Student.findById(studentId);

        if (!book || !student) {
            return res.status(404).json({ message: 'Book or Student not found' });
        }

        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 7); // Set due date to 1 week later

        const borrow = new Borrow({
            book: bookId,
            student: studentId,
            borrowDate,
            dueDate
        });

        await borrow.save();
        res.status(201).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const borrows = await Borrow.find().populate('book student');
        res.status(200).json(borrows);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;

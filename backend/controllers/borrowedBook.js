// controllers/borrowedBook.js
const BorrowedBook = require('../models/BorrowedBook');
const Student = require('../models/Student');
const Book = require('../models/Book');

const lendBook = async (req, res) => {
    const { studentId, bookId } = req.body;
    try {
        const student = await Student.findById(studentId);
        const book = await Book.findById(bookId);
        if (!student || !book) {
            return res.status(404).json({ message: 'Student or Book not found' });
        }
        const borrowedBook = new BorrowedBook({ studentId, bookId, borrowedDate: new Date() });
        await borrowedBook.save();
        res.status(201).json(borrowedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error lending book', error: error.message });
    }
};

const getBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBook.find().populate('studentId bookId');
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowed books', error: error.message });
    }
};

module.exports = { lendBook, getBorrowedBooks };

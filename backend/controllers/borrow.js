const Book = require('../models/Book');
const Student = require('../models/Student');
const Borrow = require('../models/Borrow');

const lendBook = async (req, res) => {
    const { bookId, studentId } = req.body;
    try {
        const book = await Book.findById(bookId);
        const student = await Student.findById(studentId);

        if (!book || !student) {
            return res.status(404).json({ message: 'Book or Student not found' });
        }

        if (book.isBorrowed) {
            return res.status(400).json({ message: 'Book is already borrowed' });
        }

        const borrow = new Borrow({
            book: bookId,
            student: studentId,
            borrowDate: new Date(),
            dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // 1 week later
        });

        await borrow.save();
        book.isBorrowed = true; // Mark the book as borrowed
        await book.save();

        res.status(200).json({ message: 'Book lent successfully' });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

const getBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await Borrow.find().populate('book').populate('student');
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

module.exports = { lendBook, getBorrowedBooks };

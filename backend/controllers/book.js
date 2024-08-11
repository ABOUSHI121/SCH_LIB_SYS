// controllers/book.js

const Book = require('../models/Book');

const getAvailableBooks = async (req, res) => {
    try {
        const availableBooks = await Book.find({ isBorrowed: false });
        res.status(200).json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

const addBook = async (req, res) => {
    const { title, author, category } = req.body;
    try {
        const newBook = new Book({ title, author, category });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book' });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books' });
    }
};

module.exports = { getAvailableBooks, addBook, getBooks };

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ShowBooks.module.css'; // Import the CSS module

const ShowBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className={styles.container}>
            <h1>All Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        {book.title} by {book.author} (Category: {book.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowBooks;

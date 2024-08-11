import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AvailableBooks.module.css'; // Import the CSS module

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/books/available');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching available books:', error);
      }
    };

    fetchAvailableBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Available Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}, <strong>Category:</strong> {book.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBooks;

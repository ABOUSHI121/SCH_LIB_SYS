import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BorrowedBooks.module.css'; // Import the CSS module

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/borrowed-books');
        setBorrowedBooks(res.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Borrowed Books</h1>
      <ul>
        {borrowedBooks.map(borrow => (
          <li key={borrow._id}>
            <span>Book:</span> {borrow.book.title}, <span>Borrowed by:</span> {borrow.student.name}, <span>Due Date:</span> {new Date(borrow.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;

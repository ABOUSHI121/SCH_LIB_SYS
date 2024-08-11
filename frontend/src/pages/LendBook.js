import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LendBook.module.css'; // Import the CSS module

const LendBook = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ bookId: '', studentId: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/books');
        // Filter books client-side
        const availableBooks = res.data.filter(book => !book.isBorrowed);
        setBooks(availableBooks);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/students');
        setStudents(res.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchBooks();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/lend', formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to lend book');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lend a Book</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="bookId">Book</label>
          <select name="bookId" id="bookId" value={formData.bookId} onChange={handleChange}>
            <option value="">Select a book</option>
            {books.map(book => (
              <option key={book._id} value={book._id}>{book.title}</option>
            ))}
          </select>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="studentId">Student</label>
          <select name="studentId" id="studentId" value={formData.studentId} onChange={handleChange}>
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Lend Book</button>
      </form>
    </div>
  );
};

export default LendBook;

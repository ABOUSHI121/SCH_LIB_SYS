import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddBook.module.css'; // Import the CSS module

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/books', {
                title,
                author,
                category
            });
            setMessage({ type: 'success', text: 'Book added successfully!' });
            console.log('Book added:', response.data);
            // Redirect to the home page after a short delay
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error('Error adding book:', error);
            setMessage({ type: 'error', text: `Error adding book. Please try again. ${error.message}` });
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
                {message && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddBook;

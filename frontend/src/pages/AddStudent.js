import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddStudent.module.css'; // Import the CSS module

const AddStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/students/add', {
                name,
                email
            });
            setMessage({ type: 'success', text: 'Student added successfully!' });
            // Redirect to the home page after a short delay
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error adding student. Please try again.' });
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Student</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Add Student</button>
                {message && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddStudent;

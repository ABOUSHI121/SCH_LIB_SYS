import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageFees.module.css'; // Import the CSS module

const ManageFees = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [fee, setFee] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students', error);
            }
        };
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/students/fees', {
                studentId: selectedStudent,
                amount: fee
            });
            setMessage({ type: 'success', text: 'Fee recorded successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error recording fee. Please try again.' });
        }
    };

    return (
        <div className={styles.container}>
            <h1>Manage Fees</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="student">Select Student</label>
                    <select id="student" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value="">Select a student</option>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>
                                {student.name} ({student.email})
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="fee">Fee Amount</label>
                    <input
                        type="number"
                        id="fee"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                    />
                </div>
                <button type="submit">Record Fee</button>
                {message && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ManageFees;

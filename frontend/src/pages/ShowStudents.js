import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowStudents = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Update the endpoint to call the new function if needed
                const response = await axios.get('http://localhost:3001/api/students/with-fees'); 
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students', error);
                setError('Failed to fetch students. Please try again later.');
            }
        };
        fetchStudents();
    }, []);

    return (
        <div className="container">
            <h1>All Students</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        {student.name} ({student.email})
                        {student.hasUnpaidFees && (
                            <span style={{ color: 'red', marginLeft: '10px' }}>Fee Due!</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowStudents;

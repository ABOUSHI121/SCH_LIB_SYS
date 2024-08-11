import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from storage
                const response = await axios.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    const resendConfirmationEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.get('/api/users/resend-confirmation', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Confirmation email sent!');
        } catch (error) {
            console.error(error);
            alert('Failed to send confirmation email.');
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {user.email}</p>
            <p>
                Status: {user.confirmed ? <span style={{ color: 'green' }}>Confirmed</span> : <span style={{ color: 'red' }}>Unconfirmed</span>}
                {!user.confirmed && <button onClick={resendConfirmationEmail}>Resend Confirmation Email</button>}
            </p>
        </div>
    );
};

export default UserProfile;

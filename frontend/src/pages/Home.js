import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token or any session storage
        localStorage.removeItem('token');
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the School Library System</h1>
            <div className={styles.navigation}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link to="/add-book">Add New Book</Link></li>
                    <li className={styles.navItem}><Link to="/show-books">Show All Books</Link></li>
                    <li className={styles.navItem}><Link to="/add-student">Add New Student</Link></li>
                    <li className={styles.navItem}><Link to="/show-students">Show All Students</Link></li>
                    <li className={styles.navItem}><Link to="/lend-book">Lend a Book</Link></li>
                    <li className={styles.navItem}><Link to="/borrowed-books">Show Borrowed Books</Link></li>
                    <li className={styles.navItem}><Link to="/manage-fees">Manage Fees</Link></li>
                    <li className={styles.navItem}><Link to="/available-books">Available Books</Link></li>
                    <li className={styles.navItem}><button onClick={handleLogout} className={styles.logoutButton}>Log Out</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import ShowBooks from './pages/ShowBooks';
import AddStudent from './pages/AddStudent';
import ShowStudents from './pages/ShowStudents';
import LendBook from './pages/LendBook';
import BorrowedBooks from './pages/BorrowedBooks';
import ManageFees from './pages/ManageFees';
import AvailableBooks from './pages/AvailableBooks';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                
                {/* Use ProtectedRoute to secure all other routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/show-books" element={<ShowBooks />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/show-students" element={<ShowStudents />} />
                    <Route path="/lend-book" element={<LendBook />} />
                    <Route path="/borrowed-books" element={<BorrowedBooks />} />
                    <Route path="/manage-fees" element={<ManageFees />} />
                    <Route path="/available-books" element={<AvailableBooks />} />
                </Route>

                {/* Redirect root path to /login */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

// TESTTT
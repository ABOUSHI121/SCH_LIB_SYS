import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const confirmUserEmail = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/confirm/${token}`);
        return response.data;
    } catch (error) {
        console.error('Error confirming email:', error);
        throw error;
    }
};

// Add more functions for books, students, etc.
export const addBook = async (bookData) => {
    try {
        const response = await axios.post(`${API_URL}/books`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const getAvailableBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books?isBorrowed=false`);
        return response.data;
    } catch (error) {
        console.error('Error fetching available books:', error);
        throw error;
    }
};
export const addStudent = async (studentData) => {
    try {
        const response = await axios.post(`${API_URL}/students`, studentData);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};

export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};


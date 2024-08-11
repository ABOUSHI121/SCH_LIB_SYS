const express = require('express');
const router = express.Router();
const { getStudentsWithFeeStatus, addStudent, getStudents, manageFees } = require('../controllers/student');

// Route to get students with fee status
router.get('/with-fees', getStudentsWithFeeStatus);

// Route to add a new student
router.post('/add', addStudent);

// Route to get all students (simple list)
router.get('/', getStudents);

// Route to manage fees
router.post('/fees', manageFees);

module.exports = router;

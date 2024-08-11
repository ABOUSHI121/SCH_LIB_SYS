const Student = require('../models/Student');

// Function to get all students with fee status
const getStudentsWithFeeStatus = async (req, res) => {
    try {
        const students = await Student.find();
        const currentDate = new Date();
        const updatedStudents = students.map(student => {
            const hasUnpaidFees = student.fees.some(fee => fee.date < currentDate && fee.amount > 0);
            return {
                ...student.toObject(),
                hasUnpaidFees
            };
        });
        res.status(200).json(updatedStudents);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

// Existing function to add a student
const addStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        const student = new Student({ name, email, fees: [{ amount: 0, date: new Date() }] });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error adding student', error: error.message });
    }
};

// Existing function to get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

// Existing function to manage fees
const manageFees = async (req, res) => {
    const { studentId, amount } = req.body;
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        student.fees.push({ amount, date: new Date() });
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error managing fees', error: error.message });
    }
};

module.exports = { addStudent, getStudents, manageFees, getStudentsWithFeeStatus };

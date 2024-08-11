const express = require('express');
const Fee = require('../models/Fee');
const Student = require('../models/Student');
const router = express.Router();

router.post('/', async (req, res) => {
    const { studentId, amount } = req.body;
    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fee = new Fee({
            student: studentId,
            amount,
            date: new Date()
        });

        await fee.save();
        res.status(201).json({ message: 'Fee recorded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const fees = await Fee.find().populate('student');
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;

const Student = require('../models/Student');
const Fee = require('../models/Fee');

const recordFee = async (req, res) => {
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
        res.status(200).json({ message: 'Fee recorded successfully' });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

const getFees = async (req, res) => {
    try {
        const fees = await Fee.find().populate('student');
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

module.exports = { recordFee, getFees };

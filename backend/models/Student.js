const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fees: [feeSchema],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

const mongoose = require('mongoose');

//change this schema to expenses
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeId: { type: Number, required: true },
    employeeName: { type: String, required: true },
    employeeDate: { type: Number, required: true },
    employeeMonth: { type: Number, required: true },
    employeeImage: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
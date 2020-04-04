const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeId: { type: Number, required: true },
    employeeName: { type: String, required: true },
    employeeDate: { type: Number, required: true },
    employeeMonth: { type: Number, required: true },
    employeeImage: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
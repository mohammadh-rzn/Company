const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationalCode: {
        type: Number,
        required: true,
        unique: true
    },
    male: {
        type: Boolean,
        required: true
    },
    manager: {
        type: Boolean,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    birthDate: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Employee', EmployeeSchema);
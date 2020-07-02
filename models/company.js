const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    regNumber: {
        type: Number,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Company', CompanySchema);
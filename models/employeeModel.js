const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const empSchema = new Schema({
    first_name: {
        type: String,
        required: [true,'First Name is required field.'],
    },
    last_name: {
        type: String,
        required: [true,'Last Name is required field.'],
    },
    phone: {
        type: String,
        required: [true,'Phone is required field.'],
        unique: true
    },
    email: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: [true,'Upload Image is required field.'],
    },
    address: {
        type: String,
        required: [true,'Address is required field.'],
    },
    skill: {
        type: String,
        required: false,
    },
    experience: {
        type: Number,
        required: true,
        default: 0,
    },
    availability: {
        type: Boolean,
        required: false,
    },
    work_schedule: {
        type: String,
        required: false,
    },
    comment_count: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: false, 
    }
},{timestamps: true});

const EmployeeModel = mgoose.model('employeeModel', empSchema);
module.exports = EmployeeModel;
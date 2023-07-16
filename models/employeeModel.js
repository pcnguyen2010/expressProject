const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const empSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    address: {
        type: Object,
        required: false,
    },
    skill: {
        type: Object,
        required: false,
    }
},{timestamps: true});

const EmployeeModel = mgoose.model('employeeModel', empSchema);
module.exports = EmployeeModel;
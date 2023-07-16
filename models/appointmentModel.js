const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const apptSchema = new Schema({
    customer_name: {
        type: String,
        required: true,
    },
    appointment: {
        type: String,
        required: true,
    },
    employee_name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
    }
},{timestamps: true});

const AppointmentModel = mgoose.model('appointmentModel', apptSchema);
module.exports = AppointmentModel;
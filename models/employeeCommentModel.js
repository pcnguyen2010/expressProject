const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const commentSchema = new Schema({
    employee_id: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
},{timestamps: true});

const EmployeeCommentModel = mgoose.model('employeeCommentModel', commentSchema);
module.exports = EmployeeCommentModel;
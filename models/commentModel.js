const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const commentSchema = new Schema({
    employee_id: {
        type: String,
        required: [true,'Employee ID is required field.'],
    },
    customer_name: {
        type: String,
        required: [true,'Custome Name is required field.'],
    },
    comment: {
        type: String,
        required: [true,'Comment is required field.'],
    }
},{timestamps: true});

const CommentModel = mgoose.model('commentModel', commentSchema);
module.exports = CommentModel;
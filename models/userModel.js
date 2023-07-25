const mgoose = require('mongoose');
const Schema = mgoose.Schema;

const uSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

module.exports = mgoose.model('userModel', uSchema);
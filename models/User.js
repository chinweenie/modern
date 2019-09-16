const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // companies: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'companies'
    // }],
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'stories'
    }]
});

module.exports = User = mongoose.model('users', UserSchema);
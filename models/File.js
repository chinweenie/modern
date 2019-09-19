const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    URL:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    type:{ // image, audio, etc
        type: String,
        required: true
    },
    name: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = File = mongoose.model('files', FileSchema);
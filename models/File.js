const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    URL:{
        type: String,
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        require: true
    },
    filename: {
        type: String,
        require: false
    },
    etag: {
        type: String,
        require: true
    },
    public_id: {
        type: String,
        require: true
    },
    resource_type: {
        type: String,
        require: true
    },
    signature: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = File = mongoose.model('files', FileSchema);
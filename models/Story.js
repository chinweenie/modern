const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})
//maybe add image, video, embedded links here, or just address in FE
module.exports = Company = mongoose.model('stories', StorySchema);
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
    },
    claps:{
        type: Map
    },
    responses: [
       {
           user: {
               type: Schema.Types.ObjectId,
               ref: 'users'
           },
           body: {
               type: String,
               required: true
           },
           created_date: {
               type: Date,
               default: Date.now
           }
       }
    ]
});
module.exports = Company = mongoose.model('stories', StorySchema);
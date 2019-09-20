const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'users'}]
});

module.exports = Company = mongoose.model('companies', CompanySchema)
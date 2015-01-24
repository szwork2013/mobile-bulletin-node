var mongoose = require('mongoose');
 
module.exports = mongoose.model('Department', {
    name: String,
    head: { type: Number, ref: 'Employee' },
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
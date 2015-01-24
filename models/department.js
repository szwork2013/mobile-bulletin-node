var mongoose = require('mongoose');
 
module.exports = mongoose.model('Department', {
    name: String,
    head: { type: Number, ref: 'Employee' }
});
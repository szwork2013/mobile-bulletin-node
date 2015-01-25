var mongoose = require('mongoose');
 
module.exports = mongoose.model('Group', {
    name: String,
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
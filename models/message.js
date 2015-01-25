var mongoose = require('mongoose');
 
module.exports = mongoose.model('Message', {
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    content: String,
    _created: { type: Date, default: Date.now },
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
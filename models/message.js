var mongoose = require('mongoose');
 
module.exports = mongoose.model('Message', {
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    english_content: String,
    zulu_content: String,
    sotho_content: String,
    _created: { type: Date, default: Date.now },
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
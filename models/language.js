var mongoose = require('mongoose');
 
module.exports = mongoose.model('Language', {
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    content: String
});
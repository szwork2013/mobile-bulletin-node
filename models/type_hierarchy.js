var mongoose = require('mongoose');
 
module.exports = mongoose.model('TypeHierarchy', {
    name: String,
    ordinal: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    description: String
});
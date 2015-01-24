var mongoose = require('mongoose');
 
module.exports = mongoose.model('TypeHierarchy', {
    name: String,
    description: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    ordinal: String
});
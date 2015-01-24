var mongoose = require('mongoose');
 
module.exports = mongoose.model('Support', {
    subject: String,
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    description: String,
    status: { type: Number, ref: 'Employee' },
    _created : { type: Date, default: Date.now },
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
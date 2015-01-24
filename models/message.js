var mongoose = require('mongoose');
 
module.exports = mongoose.model('Message', {
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }]
});
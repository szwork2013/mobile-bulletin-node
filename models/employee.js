var mongoose = require('mongoose');
 
module.exports = mongoose.model('Employee', {
    employee_no: String,
    initials: String,
    firstname: String,
    lastname: String,
    nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    email: String,
    cellphone: String,
    email_notifications: { type: Boolean, default: true },
    sms_notifications: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    pin: String,
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    ethnicity: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    position: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    cost_centre: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    employee_group_description: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    employee_sub_group_description: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeHierarchy' },
    _created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
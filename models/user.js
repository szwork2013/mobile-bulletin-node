var mongoose = require('mongoose');
 
module.exports = mongoose.model('User', {
    username: String,
    password: String,
    company: String,
    email: String,
    website: String,
    telephone: String
});
const mongoose = require('mongoose');
const userSchema = new mongoose.schema({}, {strict:false})

const User = mongoose.model('User', todoSchema)

module.exports = User
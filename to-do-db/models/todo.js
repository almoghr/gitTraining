const mongoose = require('mongoose');
const todoSchema = new mongoose.schema({}, {strict:false})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
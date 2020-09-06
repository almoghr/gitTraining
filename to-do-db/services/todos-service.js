const Todo = require('../models/todo.js');
const mongoose = require('mongoose')

function getTodos(){
    return Todo.collection.find({}).toArray();
}

function addTodo(todo){
    return Todo.collection.insertOne(todo)
    .then(({insertedId}) => {
        return Todo.collection.findOne({_id: insertedId});
    })
}

function removeTodo(todoId){
    return Todo.collection.deleteOne({_id: todoId})
}

function editTodo(todoId, todo = {}) {
    const {content, isDone = false}  = todo;
    return Todo.collection.updateOne({_id: mongoose.Types.ObjectId(todoId)}, {$set:{content, isDone}});
}

module.exports = function(){
    getTodos,
    addTodo,
    removeTodo,
    editTodo
}
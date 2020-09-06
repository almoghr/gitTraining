const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { port } = require('./config.js');
const connect = require('./db/index.js')
const {getTodos, addTodo, removeTodo, editTodo} = require('./services/todos-service.js')
app.use(bodyParser.json());

app.get('/api/todos', function (req, res) {
    getTodos.then(todos => {
        res.status(200).json(todos).end();
    }).catch(() => {
        res.status(500).json({message: 'internal error while loading todos list'})
        .end();
    })
});

app.post('/api/todos', function (req, res){
    if(!req.body || !req.body.content){
    }
    addTodo(req.body).then(function (newTodo) {
        res.status(200).json(newTodo).end();
    }).catch(() => {
        res.status(500).json({message: 'internal error while trying to add todo'}).end();
    })
});

app.delete('/api/todos/:todoId', function (req, res){
    removeTodo(req.params.todoId).then(function(){
        res.status(200).json({success: true}).end();
    }).catch(() => {
        res.status(500).json({message: 'internal error while trying to delete Todo'}).end();
    })
});

app.put('/api/todos/:todoId', function(req, res){
    editTodo(req.params.todoId, req.body).then(function(err, todo){
        if (err){
            res.status(500).json({message: 'internal error while trying to update Todo'}).end();
            return;
        }
        res.status(200).json({todo}).end();
    })
})

connect().then(() => {
    console.log('DB is connected');
    
    app.listen(3000, () => {
        console.log('server is up with express!');
    })    
})


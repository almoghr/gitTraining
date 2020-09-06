const {readFile, writeFile} = require('fs');
const filePath = './todos.json';

function noop() {}

function saveTodos(todos, cb) {
    writeFile(filePath, JSON.stringify(todos), 'utf8', (err) => {
        if (err) {
            cb(err)
            return
         }
         cb();
    })
}

function getTodos(cb) {
    readFile(filePath, (err, data) => {
        if(err) {
            cb(err);
            return
        }
        cb(null, JSON.parse(data));
    });
}

function addTodo (todo, cb = noop){
    getTodos((err, todos) => {
        if(err) {
            cb(err);
            return
        }
        const newTodoId = todos[todos.length-1].id +1
        const newTodo = {
            content: todo.content,
            isDone: todo.isDone || false,
            id: +newTodoId
        }
        todos.push(newTodo);   
    saveTodos(todos, (err) => {
        if(err) {
            cb(err);return
        }
        cb(null, newTodo)
    })     
});
}

function removeTodo (todoId, cb = noop) {
    getTodos((err, todos) => {
        if(err) {
            cb(err);
            return
        }
        const updatedTodoS = todos.filter((todo) => todo.id !== todoId);
        saveTodos(updatedTodoS, cb);
    })
}
function editTodo(todoId, todo, cb = noop) {
    getTodos((err, todos) => {
        if(err) {
            cb(err);
            return;
        }
        const todoToEdit = todos.find(todo => todo.id ===todoId);
        if(!todoToEdit){
            cb(new Error('there is no todo with id ' + todoId));
            return;
        }
        Object.assign(todoToEdit, todo)
        saveTodos(todos, (err) => {
            if(err) {
                cb(err);
                return
            }
            cb(null, todoToEdit)
        })
    })
}

function toggleTodoDone(todoId, isDone, cb){
    editTodo(todoId, {isDone}, cb)
}

// function showDoneOrUndone()

module.exports = {
    getTodos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodoDone,
    editTodo
}
// removeTodo(8)
// addTodo({content: 'add ability remove', isDone: true}, (err,todo) =>{
//     if(err) {
//         throw err
//     }
//     console.log('new todo: ', todo);
    
// });
// getTodos((err, todos) => { // שימוש ב גט טודוז
//     if (err){
//         throw err;
//     }
//     console.log(todos);
    
// });
// readFile(filePath, (err, data) => {
//     if (err) throw err; // קריאת קובץ מסוים והפיכתו לסטרינג 
//     console.log(data);
//     const content = data.toString();
//     const obj = JSON.parse(content);
//     console.log(content);
    
//     obj.name = 'David';
//     obj.age = 31;


// });
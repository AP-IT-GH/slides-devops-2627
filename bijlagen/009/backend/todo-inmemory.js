
const todos = [];
const {v4} = require('uuid');

todos.push({id: v4(), title: 'mijn eerste taak', status: 'TODO'})

async function getTodos(req, res) {
    return res.json(todos);
}

async function addTodo(req, res) {
    const {title} = req.body;
    todos.push({id: v4(), title,status: 'TODO'});
    return res.json('ok');
}

async function updateTodo(req, res) {
    const {status} = req.body;
    const {id} = req.params;

    const todo = todos.find(x => x.id === id);
    if (todo) {
        todo.status = status;
    }
    return res.json('ok');
}
async function deleteTodo(req, res) {
    const {id} = req.params;

    const todoIndex = todos.findIndex(x => x.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }
    return res.json('ok');
   
}

module.exports =  {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
}
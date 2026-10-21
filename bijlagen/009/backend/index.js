const express = require('express')
const app = express()
const port = 3000;
const verify = require('./verify');

const useMySQL = process.env.STORAGE && process.env.STORAGE === 'mysql';
const todo = useMySQL ? require('./todo-mysql') : require('./todo-inmemory');

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
})

app.get('/api/todos', todo.getTodos);
app.post('/api/todos', todo.addTodo);
app.put('/api/todos/:id', todo.updateTodo);
app.delete('/api/todos/:id', todo.deleteTodo)

app.post

app.get('/api/verify', verify.verify);

app.listen(port, () => {
  console.log(`Todo api listening on port ${port}`)
})
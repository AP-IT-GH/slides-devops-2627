const { randomUUID } = require('node:crypto');

function createStore() {
  const todos = [];

  return {
    list() {
      return [...todos];
    },
    add({ title }) {
      const todo = { id: randomUUID(), title, status: 'TODO' };
      todos.push(todo);
      return todo;
    },
    complete(id) {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.status = 'DONE';
      }
      return todo;
    },
  };
}

module.exports = { createStore };

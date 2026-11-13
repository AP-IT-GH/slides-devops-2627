const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../src/todos');

test('een nieuwe todo heeft status TODO', () => {
  const store = createStore();
  const todo = store.add({ title: 'les voorbereiden' });
  assert.strictEqual(todo.status, 'TODO');
  assert.strictEqual(store.list().length, 1);
});

test('een todo kan afgewerkt worden', () => {
  const store = createStore();
  const todo = store.add({ title: 'les geven' });
  store.complete(todo.id);
  assert.strictEqual(store.list()[0].status, 'DONE');
});

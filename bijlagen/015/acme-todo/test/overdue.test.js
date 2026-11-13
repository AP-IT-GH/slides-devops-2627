const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../src/todos');
const { createApp } = require('../src/app');

const now = new Date('2026-06-15T12:00:00Z');

function storeWithTodos() {
  const store = createStore();
  const late = store.add({ title: 'te laat', dueDate: '2026-06-01' });
  store.add({ title: 'op tijd', dueDate: '2026-07-01' });
  store.add({ title: 'zonder datum' });
  const finished = store.add({ title: 'af maar te laat', dueDate: '2026-06-01' });
  store.complete(finished.id);
  return { store, late };
}

test('list({ overdue: true }) geeft enkel open todos met een verstreken datum', () => {
  const { store, late } = storeWithTodos();
  const result = store.list({ overdue: true, now });
  assert.deepStrictEqual(result.map((t) => t.id), [late.id]);
});

test('list() zonder filter geeft alle todos', () => {
  const { store } = storeWithTodos();
  assert.strictEqual(store.list().length, 4);
});

test('GET /api/todos?overdue=true past de filter toe', async (t) => {
  const store = createStore();
  store.add({ title: 'lang geleden', dueDate: '2000-01-01' });
  store.add({ title: 'ver in de toekomst', dueDate: '2999-01-01' });

  const server = createApp(store).listen(0, '127.0.0.1');
  t.after(() => server.close());
  await new Promise((resolve) => server.once('listening', resolve));

  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/todos?overdue=true`);
  const body = await response.json();
  assert.deepStrictEqual(body.map((todo) => todo.title), ['lang geleden']);
});

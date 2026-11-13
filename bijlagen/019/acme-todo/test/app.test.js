const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../src/todos');
const { createApp } = require('../src/app');

async function startApp(t) {
  const server = createApp(createStore()).listen(0, '127.0.0.1');
  t.after(() => server.close());
  await new Promise((resolve) => server.once('listening', resolve));
  return `http://127.0.0.1:${server.address().port}/api/todos`;
}

test('POST /api/todos maakt een todo aan', async (t) => {
  const url = await startApp(t);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'pipeline bouwen' }),
  });
  assert.strictEqual(response.status, 201);

  const todos = await (await fetch(url)).json();
  assert.deepStrictEqual(todos.map((todo) => todo.title), ['pipeline bouwen']);
});

test('ongeldige JSON geeft status 400', async (t) => {
  const url = await startApp(t);
  const response = await fetch(url, { method: 'POST', body: '{kapot' });
  assert.strictEqual(response.status, 400);
});

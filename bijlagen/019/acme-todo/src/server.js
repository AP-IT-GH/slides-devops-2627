const { createApp } = require('./app');
const { createStore } = require('./todos');

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);

createApp(createStore()).listen(port, host, () => {
  console.log(`Todo-API luistert op ${host}:${port}`);
});

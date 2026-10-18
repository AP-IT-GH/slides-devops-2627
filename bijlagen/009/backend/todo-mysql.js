const {v4} = require('uuid');

var mysql      = require('mysql2/promise');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PWD,
    database        : process.env.MYSQL_DB,
  });
 

async function getTodos(req, res) {

    const [rows, fields] = await pool.query('SELECT * from todos');
    return res.json(rows);
}

async function addTodo(req, res) {
    const {title} = req.body;
    const todo = {
        id: v4(),
        title,
        status: 'TODO',
    }
    const [rows, fields] = await pool.query(
        'INSERT into todos(id, title, status) values (?, ?, ?)',
        [todo.id, todo.title, todo.status]);
    return res.json('ok');
}

async function updateTodo(req, res) {
    const {status} = req.body;
    const {id} = req.params;

    const [rows, fields] = await pool.query(
        'update todos set status = ? where id = ?',
        [status, id]);
    return res.json('ok');
}

async function deleteTodo(req, res) {
    const {id} = req.params;

    const [rows, fields] = await pool.query(
        'delete from todos where id = ?',
        [id]);
    return res.json('ok');

}

async function verify() {
    try {
        const [rows, fields ] = await pool.query(`SELECT count(*) as count
        FROM information_schema.TABLES
        WHERE (TABLE_SCHEMA = 'examen') AND (TABLE_NAME = 'todos')`);
        return {status: 'ok', todoTable: rows[0].count > 0 ? 'ok' : 'not ok'}
    }
    catch(err) {
        return {status: 'not ok'};
    }
    
}

module.exports =  {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    verify,
}
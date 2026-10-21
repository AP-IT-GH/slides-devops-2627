const mysql = require('./todo-mysql');

async function verify(req, res) {
    const result = {};
    result.storage = process.env.STORAGE || 'in-memory';
    if (result.storage === 'mysql') {
        result.mysql = await mysql.verify();
    }
    return res.json(result);
}

module.exports =  {
    verify,
}

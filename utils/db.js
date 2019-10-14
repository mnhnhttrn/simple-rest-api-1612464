const mysql = require('mysql')

var createConnection = () => {
    return mysql.createConnection({
        host: '85.10.205.173', //db4free.net IP
        port: 3306,
        user: 'nhat464',
        password: '123456777',
        database: 'srest1612464'
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            const connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
    create: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            const sql = `insert into ${tableName} set ?`;
            const connection = createConnection();
            connection.connect();
            connection.query(sql, entity, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertId);
                    console.log('From DB: ' + value.insertId);
                }
                connection.end();
            });
        });
    },
}

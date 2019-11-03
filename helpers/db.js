const mysql = require('mysql')

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'dev',
        password: 'password',
        database: 'week6restfulapidb'
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
                }
                connection.end();
            });
        });
    },
    update: (tableName, fieldName, entity) => {
        return new Promise((resolve, reject) => {
          var id = entity[fieldName];
          delete entity[fieldName];
          var sql = `update ${tableName} set ? where ${fieldName} = ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, [entity, id], (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.changedRows);
            }
            connection.end();
          });
        });
      },
}

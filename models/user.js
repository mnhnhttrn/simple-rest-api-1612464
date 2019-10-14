const db = require('../utils/db')
const cfg = require('../config')

module.exports = {
    findOne: username => {
        return db.load(`select * from accounts where account_username = '${username}'`)
    },
    findOneByID: id => {
        return db.load(`select * from accounts where account_id = '${id}'`)
    },
    createAccount: (username, password) =>{
        const e = {
            account_username: username,
            account_password: password
        }
        return db.create(cfg.ACCOUNT_TABLE_NAME, e)
    }
}
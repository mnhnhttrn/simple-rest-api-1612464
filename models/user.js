const db = require('../helpers/db')
const cfg = require('../config')

module.exports = {
    findOne: username => {
        return db.load(`select * from accounts where account_username = '${username}'`)
    },
    findOneByID: id => {
        return db.load(`select * from accounts where account_id = '${id}'`)
    },
    createAccount: (username, password, avatarURL) =>{
        const e = {
            account_username: username,
            account_password: password,
            account_avatar: avatarURL
        }
        return db.create(cfg.ACCOUNT_TABLE_NAME, e)
    },
    updateProfileByID: (id, username, avatarURL) =>{
        const e = {
            account_id: id,
            account_username: username,
            account_avatar: avatarURL
        }
        return db.update(cfg.ACCOUNT_TABLE_NAME, 'account_id', e)
    },
    updatePasswordByID: (id, password) => {
        const e = {
            account_id: id,
            account_password: password
        }
        return db.update(cfg.ACCOUNT_TABLE_NAME, 'account_id', e)
    }
}
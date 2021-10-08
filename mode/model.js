const mysql = require("mysql");
let config = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'reopen'
}
const connection = mysql.createConnection(config);
connection.connect((err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("数据库连接成功");
})

function query(sql, bind = null) {
    return new Promise((resolve, reject) => {
        connection.query(sql, bind, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
module.exports = query
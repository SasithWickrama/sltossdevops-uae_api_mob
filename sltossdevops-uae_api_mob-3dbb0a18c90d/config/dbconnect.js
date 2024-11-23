const dbcon  = require('mysql');

const conn = dbcon.createConnection({
    host    :process.env.DB_HOST,
    port    :process.env.DB_PORT,
    user    :process.env.DB_USER,
    password:process.env.DB_PASSWD,
    database:process.env.DB_NAME
});

conn.connect((err) => {
    if (err) {
        console.log('Database Not connected : '+ err)
        return
    }
    console.log('Database connected')
});

module.exports = conn
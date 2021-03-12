//Este arquivo configura a conexão com o banco de dados.
const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    database: 'pessoa'
})

module.exports = conexao
const mysql = require('mysql');
let conexion = mysql.createConnection({
  host:process.env.DB_HOST,
    user:'root',
    password:'luigi',
    port: 3306,
    database:'Sogico'
  });

  conexion.connect(function(err) {
    if (err) throw err;
});

module.exports = conexion;

const mysql = require('mysql');
let conexion = mysql.createConnection({

    //host:'18.212.141.183',
    host:process.env.DB_HOST,
    user:'root',
    password:'luigi',
    port: 33060,
    database:'Sogico'
  
  });
conexion.connect(function(err) {
    if (err) throw err;
});

module.exports = conexion;

const mysql = require('mysql');
let conexion = mysql.createConnection({


    host:'',
    user:'',
    password:'',
    port: ,
    database:''
  
  });
conexion.connect(function(err) {
    if (err) throw err;
});

module.exports = conexion;

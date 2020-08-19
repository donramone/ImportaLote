const mysql = require('mysql');
let conexion = mysql.createConnection({
    host:'18.212.141.183',
    user:'root',
    password:'luigi',
    port: 33060,
    database:'Sogico'
  
  });
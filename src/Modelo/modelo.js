// const mysql = require('mysql');
// const fs = require('fs');
// const conexion = require('../Data/config');

// module.exports = {
//   insertLote(nombre, calidad, fardos, resistencia, promedio, colores, codMicro, longitud, paquetes, micronaire, año, estado, codEstado, codCliente, fechaCreacion) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`insert into Lotes_tmp
//             (nroLote, Calidad,Fardos,Resistencia,Promedio,Colores,CodMicro,Longitud,Paquetes,Micronaire,Año,Estado,CodEstado,CodCliente,FechaCreacion)
//             values
//             (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//         [nombre, calidad, fardos, resistencia, promedio, colores, codMicro, longitud, paquetes, micronaire, año, estado, codEstado, codCliente, fechaCreacion], (err, resultados) => {
//           if (err) reject(err);
//           else resolve(resultados.insertId);
//         });
//     });
//   },
//   insertFardo(CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, fechaCreacion) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`INSERT INTO Fardos_tmp
//             (CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, FechaCreacion)
//             VALUES
//             (?,?,?,?,?,?)`,
//         [CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, fechaCreacion], (err, resultados) => {
//           if (err) reject(err);
//           else resolve(resultados.insertId);
//         });
//     });
//   },
//   actualizarFardo(calidad, resistencia, longitud, micronaire, colores, numeroCliente, numeroFardo, ciclo) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`UPDATE fardo_copy SET
//                 CAL = ?,
//                 RES = ?,
//                 HEB = ?,
//                 MIC = ?,
//                 COL = ?
//                 WHERE DUE = ? AND FAR = ? AND n_ciclo = ? `,
//         [calidad, resistencia, longitud, micronaire, colores, numeroCliente, numeroFardo, ciclo],
//         (err) => {
//           if (err) reject(err);
//           else resolve();
//         });
//     });
//   },
//   traerLotesPorCliente(CodCliente) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`SELECT count(*) AS total from Lotes_tmp WHERE CodCliente = ?`,
//         [CodCliente],
//         (err, resultados) => {
//          // console.log({ resultados });
//           if (err) reject(err);
//           else resolve(resultados[0]);
//         });
//     });
//   },
//   traerCalidadDb(codCalidad) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`select ncalidad from transCalidad where calidad = ?`,
//         [codCalidad],
//         (err, resultados) => {
//           console.log({ resultados });
//           if (err) reject(err);
//           else resolve(resultados[0]);
//         });
//     });
//   },
//   traerClientesDb(codCliente) {
//     return new Promise((resolve, reject) => {
//       conexion.query(`select * from transCliente where codigocliente = ?`,
//         [codCliente],
//         (err, resultados) => {

//           if (err) reject(err);
//           else resolve(resultados[0]);
//         });
//     });
//   },
//   vaciarFardos() {
//     return new Promise((resolve, reject) => {
//       conexion.query(`TRUNCATE TABLE Fardos_tmp`,
//         (err, resultados) => {

//           if (err) reject(err);
//           else resolve(resultados[0]);
//         });
//     });
//   },
//   vaciarLotes() {
//     return new Promise((resolve, reject) => {
//       conexion.query(`TRUNCATE TABLE Lotes_tmp`,
//         (err, resultados) => {

//           if (err) reject(err);
//           else resolve(resultados[0]);
//         });
//     });
//   },
//   traerCalidadJson() {
//     try {
//       return JSON.parse(fs.readFileSync('./src/data/calidad.json'))
//     } catch (err) {
//       if (err.code === 'ENOENT') {
//         console.log('No se encontró el archivo calidad.json!');
//       } else {
//         throw err;
//       }
//     }
//   },
//   traerClientesJson() {
//     try {
//       return JSON.parse(fs.readFileSync('./src/Data/clientes.json'))
//     } catch (err) {
//       if (err.code === 'ENOENT') {
//         console.log('No se encontró el archivo clientes.json!');
//       } else {
//         throw err;
//       }
//     }
//   }
// }

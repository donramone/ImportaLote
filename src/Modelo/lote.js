/* eslint-disable max-len */
const conexion = require('../Data/config');

module.exports = {
  insertLoteOld(nombre, calidad, fardos, resistencia, promedio, colores, codMicro, longitud, paquetes, micronaire, año, estado, codEstado, codCliente, fechaCreacion) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into Lotes_tmp
            (nroLote, Calidad,Fardos,Resistencia,Promedio,Colores,CodMicro,Longitud,Paquetes,Micronaire,Año,Estado,CodEstado,CodCliente,FechaCreacion)
            values
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [nombre, calidad, fardos, resistencia, promedio, colores, codMicro, longitud, paquetes, micronaire, año, estado, codEstado, codCliente, fechaCreacion], (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados.insertId);
      });
    });
  },
  insertLote(lote) {
    return new Promise((resolve, reject) => {
      conexion.query('INSERT INTO Lotes_tmp SET ?', lote, (err, resultados) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Insert Lote ID: ${resultados.insertId} Cliente: ${lote.codigoCliente} NroLote: ${lote.nroLote} `);
          resolve('OK ', resultados.insertId);
        }
      });
    });
  },
  vaciarLotes() {
    return new Promise((resolve, reject) => {
      conexion.query('TRUNCATE TABLE Lotes_tmp',
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
};

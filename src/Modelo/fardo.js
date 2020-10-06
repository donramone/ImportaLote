const conexion = require('../Data/config');

module.exports = {
  insertFardo(CodigoCliente, NroLote, Nrofardo, Calidad, CodCalidad, fechaCreacion) {
    return new Promise((resolve, reject) => {
      conexion.query(`INSERT INTO Fardos_tmp
            (CodigoCliente, NroLote, Nrofardo, Calidad, CodCalidad, FechaCreacion)
            VALUES
            (?,?,?,?,?,?)`,
      [CodigoCliente, NroLote, Nrofardo, Calidad, CodCalidad, fechaCreacion], (err, resultados) => {
        console.log("Estoy en PROMESA", CodigoCliente);
        if (err) {
          reject(err);
        } else {
          resolve(resultados.insertId);
        }
      });
    });
  },
  insertFardoNew(fardo) {
    return new Promise((resolve, reject) => {
      console.log(fardo);
      conexion.query('INSERT INTO Fardos_tmp Set ?', fardo, (err, resultados) => {
        if (err) {
          console.log(err);
          reject("error en la promsesa");
        } else {
          console.log(`Guardando Fardo: ${fardo.nroFardo} lote Nro: ${fardo.nroLote} Cliente: ${fardo.codigoCliente}`);
          resolve(`Guardando Fardo: ${fardo.nroFardo} lote Nro: ${fardo.nroLote} Cliente: ${fardo.codigoCliente} Id: ${resultados.insertId}`);
          // resolve(result.insertId);
        }
      });
    });
  },
  vaciarFardos() {
    return new Promise((resolve, reject) => {
      conexion.query('TRUNCATE TABLE Fardos_tmp',
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
};

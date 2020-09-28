const conexion = require('../Data/config');
module.exports = {
  insertFardo(CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, fechaCreacion) {
    return new Promise((resolve, reject) => {
      conexion.query(`INSERT INTO Fardos_tmp
            (CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, FechaCreacion)
            VALUES
            (?,?,?,?,?,?)`,
      [CodigoCliente, NroLote, Numfardo, Calidad, CodCalidad, fechaCreacion], (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados.insertId);
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

const Lote = require('../Entidades/lote');

module.exports = function mapearLoteApi(datosApi) {
  const codigoCliente = datosApi.Cliente;
  const {
    NroLote: nroLote,
    Calidad: calidad,
    Fardos: fardos,
    Resistencia: resistencia,
    Promedio: promedio,
    Colores: colores,
    CodMicro: codMicro,
    Longuitud: longitud,
    Paquetes: paquetes,
    Micronaire: micronaire,
    Año: año,
    Estado: estado,
    CodEstado: codigoEstado,
  } = datosApi.lote;

  return new Lote({
    nroLote,
    calidad,
    fardos,
    resistencia,
    promedio,
    colores,
    codMicro,
    longitud,
    paquetes,
    micronaire,
    año,
    estado,
    codigoEstado,
    codigoCliente,
  });
};

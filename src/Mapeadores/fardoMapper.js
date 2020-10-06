const Fardo = require('../Entidades/fardo');

module.exports = function mapearFardoApi(datosApi) {
  const {
    Cliente: codigoCliente,
    NroLote: nroLote,
  } = datosApi;
  const {
    Num: nroFardo,
    Calidad: calidad,
    CodCalidad: codCalidad,
  } = datosApi.item;

  return new Fardo({
    codigoCliente,
    nroLote,
    nroFardo,
    calidad,
    codCalidad,
  });
};

const Fardo = require('../Entidades/fardo');

module.exports = function mapearFardoApi(datosApi) {
  const {
    Cliente: codCliente,
    NroLote: nroLote,
  } = datosApi;
  const {
    Num: nroFardo,
    Calidad: calidad,
    CodCalidad: codCalidad,
  } = datosApi.item;

  return new Fardo({
    codCliente,
    nroLote,
    nroFardo,
    calidad,
    codCalidad,
  });
};

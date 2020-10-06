module.exports = class Fardo {
  constructor({
    codigoCliente,
    nroLote,
    nroFardo,
    calidad,
    codCalidad,
  }) {
    this.codigoCliente = codigoCliente;
    this.nroLote = nroLote;
    this.nroFardo = nroFardo;
    this.calidad = calidad;
    this.codCalidad = codCalidad;
  }
};

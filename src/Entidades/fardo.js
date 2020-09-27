module.exports = class Fardo {
  constructor({
    codCliente,
    nroLote,
    nroFardo,
    calidad,
    codCalidad,
  }) {
    this.codCliente = codCliente;
    this.nroLote = nroLote;
    this.nroFardo = nroFardo;
    this.calidad = calidad;
    this.codCalidad = codCalidad;
  }
};

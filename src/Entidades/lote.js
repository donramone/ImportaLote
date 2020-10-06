module.exports = class Lote {
  constructor({
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
  }) {
    this.nroLote = nroLote;
    this.calidad = calidad;
    this.fardos = fardos;
    this.resistencia = resistencia;
    this.promedio = promedio;
    this.colores = colores;
    this.codMicro = codMicro;
    this.longitud = longitud;
    this.paquetes = paquetes;
    this.micronaire = micronaire;
    this.año = año;
    this.estado = estado;
    this.codigoEstado = codigoEstado;
    this.codigoCliente = codigoCliente;
  }
};

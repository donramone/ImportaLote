module.exports = class Lote {
    constructor({
        id,
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
        cliente     
    }) {
        this.id = id;
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
        this.cliente = cliente;      
    }
  };
  
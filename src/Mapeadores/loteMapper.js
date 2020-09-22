const Lote = require('../Entidades/lote');

module.exports =  function mapearLote(datosApi) {
    const {
      nroLote: nroLote,
      calidad: calidad,
      fardos: fardos,
      resistencia: resistencia,
      promedio: promedio,
      colores:colores,
      codMicro:codMicro,
      longitud:longitud,
      paquetes:paquetes,
      micronaire:micronaire,
      año:año,
      estado:estado,
      codigoEstado:codigoEstado,
      cliente:cliente     
    } = datosApi;

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
        cliente     
    });
  }
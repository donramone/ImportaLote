const Lote = require('../Entidades/lote');

// No entiendo si debo usar el nombre de esta funcion mapearLoteApi ya que estoy usando Lote no mas
module.exports =  function mapearLoteApi(datosApi) {
  //Aca no se si esta correcto como lo arme:
  const cliente = datosApi['cliente'];
  const {
      NroLote: nroLote,
      Calidad: calidad,
      Fardos: fardos,
      Resistencia: resistencia,
      Promedio: promedio,
      Colores:colores,
      CodMicro:codMicro,
      Longuitud:longitud,
      Paquetes:paquetes,
      Micronaire:micronaire,
      Año:año,
      Estado:estado,
      CodEstado:codigoEstado,
    } = datosApi.detallesLote;
    

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
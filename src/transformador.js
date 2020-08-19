const modelo = require('./Modelo/modelo');

module.exports = {
    obtenerCalidad(codCalidad) {
        const calidad = modelo.traerCalidadJson();
        for (var i = 0; i < calidad.length; ++i) {
          var calidad_i = calidad[i];
          if (calidad_i["codigoCalidad"] == codCalidad) {
            return calidad_i["numeroCalidad"];
      
          }
        }
      },
      
    obtenerCliente(codCliente) {
        const cliente = modelo.traerClientesJson();
        for (var i = 0; i < cliente.length; ++i) {
          var cliente_i = cliente[i];
          if (cliente_i["codigoCliente"] == codCliente) {
            return cliente_i["nc"];
          }
        }
      },
     
    obtenerFechaCiclo() {
        // Formato: año anterior 4 digitos / año actual 2 digitos: ejemplo --> 2019/20
        const year = new Date();
        //console.log(year.getFullYear() - 1 + "/" + (year.getFullYear().toString().substr(-2)));
        return (year.getFullYear() - 1 + "/" + (year.getFullYear().toString().substr(-2)));
        //return "2015/16"
      }
}
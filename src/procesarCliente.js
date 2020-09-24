//const {vaciarTablas} = require('./Servicio/servicio');
const api = require('./Api/api.js');
const lote = require('./Modelo/lote.js');
const servicio = require('./Servicio/servicio');
// export default async function procesarCliente(cliente, anio){
    
async function procesarCliente(cliente, anio){
    //await vaciarTablas();
    try {
        
      //api.obtenerLotesPorClienteAPI(cliente, anio);
      
      const lotes = await api.getLotesByCliente(cliente, anio);
      console.log(lotes);
      //await servicio.guardar(lotes);
      const fardos =  await api.getFardosByLote(lotes);
      console.log(fardos);
      
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        return;
    }
}
module.exports = procesarCliente;
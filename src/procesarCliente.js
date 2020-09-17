//const {vaciarTablas} = require('./Servicio/servicio');
const api = require('./Api/api.js');
//const servicio = require('./Servicio/servicio');
// export default async function procesarCliente(cliente, anio){
    
async function procesarCliente(cliente, anio){
    //await vaciarTablas();
    try {
        
       // servicio.getLotes(cliente, anio);
       await api.obtenerLotesPorClienteAPI(cliente, anio);
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        return;
    }
}
module.exports = procesarCliente;
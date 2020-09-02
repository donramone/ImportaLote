const {vaciarTablas} = require('./Servicio/servicio');
const api = require('./Api/api.js');
// export default async function procesarCliente(cliente, anio){
    async function procesarCliente(cliente, anio){
    //await vaciarTablas();

    try {
       await api.obtenerLotesPorClienteAPI(cliente, anio);
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        return;
    }
    console.log("Finalizo la ejecucion del programa");
}
module.exports = procesarCliente;
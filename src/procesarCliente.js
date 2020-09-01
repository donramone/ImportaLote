const {vaciarTablas} = require('./Servicio/servicio');

export default async function procesarCliente(cliente, anio){
    await vaciarTablas();

    try {
       await obtenerLotesPorClienteAPI(cliente, anio);
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        return;
    }
    console.log("Finalizo la ejecucion del programa");
}

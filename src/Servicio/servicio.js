const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
//const api = require('../Api/api.js');

async function vaciarTablas(){
   //await modelo.vaciarLotes();
   //await modelo.vaciarFardos();
}

async function getLotes(cliente, anio){
//Desde este modulo no me funciona el obternetLotesPorApi
//Creo que es por que hay como una recursividad en las llamadas a modulos.
/*     try {
        await api.obtenerLotesPorClienteAPI(cliente, anio);
        //Aca quisiera tener algo asi
        const lotes = api.obtenerLotesPorClienteAPI(cliente);
        guardarLotes(lotes);
        const fardos = api.obtenerFardosPorLoteAPI(lotes);
        guardarFardos(fardos);
        
    } catch (error) {
        console.log("Error en getLotes" + error);
    } */
}


async function guardarLotes(lotes) {
    const lotesPromesas = lotes.LoteDetails.map(async (lote) => {
        await modeloLote
        .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], lotes.CodigoCliente, new Date())
    
    });
    return Promise.all(lotesPromesas)
}

async function guardarFardos(fardos) {
    // SyntaxError: await is only valid in async function
    // No sé si esta bien dejar los dos async.
    const fardosPromesa = fardos.Fardos.map(async(fardo) => {
        await modeloFardo
            .insertFardo(fardos.CodigoCliente, fardos.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
            console.log("Guardando Nro Lote: " + fardos.NroLote + " Nro Fardo: " + fardo['Num']  + " Cliente: " + fardos.CodigoCliente );
    });
    //No sé si esta bien devolver las promesas ya que aca termina.
    // ¿Estas promesas me sirven para manejar una excepción si no guardo correctamente? 
    return Promise.all(fardosPromesa);
} 

module.exports = {vaciarTablas,guardarLotes,guardarFardos,getLotes};

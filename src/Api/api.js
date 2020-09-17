const axios = require('axios');
const servicio = require('../Servicio/servicio.js')
//const APIKEY = process.env.APIKEY;
APIKEY = "3YEU2OTMAQ"
// NO me funciono bien el process.env asi que por ahora no me meto con eso, tambien desp quitare pasar como parametro el año.

async function obtenerLotesPorClienteAPI(codigoCliente, año) {
    const limiteLote = 50;
    //¿Funcionara la variable todosLosLotes si la uso en vez dataConSkip, asi puedo accederla desde afuera del for???? 
    //const todosLosLotes;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = data.TotalLotes;
        console.log("Totales: " + totales);
        for (let i = 0; i < totales; i = i + 50) {
            const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
            skip = skip + limiteLote;
            //Trancado aca: NO PUEDE ENCONTRAR COMO DEVOLVER EL JSON UNA VEZ QUE TENGA TODOS LOS "dataConSkip"
            await servicio.guardarLotes(dataConSkip);
            await obtenerFardosPorLoteAPI(dataConSkip);
        }
    } catch (ex) {
        console.log(ex);
    }
    //Aca me gustaria devolver todosLosLotes
}

async function obtenerFardosPorLoteAPI(lotes) {
    const limiteFardo = "100"; 
    const año = "2020";   
    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    lotes.LoteDetails.map(async (lote) => {
     try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": lotes.CodigoCliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": lote['NroLote'] });
        // me gustaria hacer un return de los fardos y no llamar en esta funcion a guardarFardos
        await servicio.guardarFardos(data);
     } catch (ex) {
         console.log(ex);
     }
    });
}
module.exports = {obtenerLotesPorClienteAPI,obtenerFardosPorLoteAPI};

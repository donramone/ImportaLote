const axios = require('axios');
//const servicio = require('../Servicio/servicio.js')
//const APIKEY = process.env.APIKEY;
APIKEY = "3YEU2OTMAQ"

async function obtenerLotesPorClienteAPI(codigoCliente, año) {
    const limiteLote = 50;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = data.TotalLotes;
        for (let i = 0; i < totales; i = i + 50) {
           const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
           skip = skip + limiteLote;
           await servicio.guardarLotes(dataConSkip);
           await obtenerFardosPorLoteAPI(dataConSkip);
        }
    } catch (ex) {
        console.log(ex);
    }
}


async function obtenerLotes(codigoCliente) {
    const año = 2020;
    const limiteLote = 50;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = data.TotalLotes;
        for (let i = 0; i < totales; i = i + 50) {
           const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
           skip = skip + limiteLote;
           return dataConSkip;
        }
    } catch (ex) {
        console.log(ex);
    }
}

async function obtenerFardosPorLoteAPI(lotes) {
    const limiteFardo = "100"; 
    const año = "2020";   
    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    lotes.LoteDetails.map(async (lote) => {
     try {
         const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": lotes.CodigoCliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": lote['NroLote'] });
         await servicio.guardarFardos(data);
     } catch (ex) {
         console.log(ex);
     }

    });
}
module.exports = {obtenerLotesPorClienteAPI,obtenerFardosPorLoteAPI,obtenerLotes };

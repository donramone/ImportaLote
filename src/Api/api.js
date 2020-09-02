const axios = require('axios');
const servicio = require('../Servicio/servicio.js')
//const APIKEY = process.env.APIKEY;
APIKEY = "3YEU2OTMAQ"
async function obtenerLotesPorClienteAPI(codigoCliente, año) {
    const limiteLote = 50;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = data.TotalLotes;
        console.log("data es " + data)
        for (let i = 0; i < totales; i = i + 50) {
            const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
            skip = skip + limiteLote;
            await servicio.guardarLotes(dataConSkip);
           // console.log(dataConSkip);
            await obtenerFardosPorLoteAPI(dataConSkip.CodigoCliente, dataConSkip.LoteDetails['NroLote']);
            
        }
    } catch (ex) {
        console.log(ex);
    }
}

async function obtenerFardosPorLoteAPI(codigoCliente, l) {
    const limiteFardo = "100"; 
    const año = "2020";
    console.log("Cliente " + codigoCliente + "NroLote " + l);
    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": nroLote });
       // await guardarFardos(data);
    } catch (ex) {
        console.log(ex);
    }
}

module.exports = {obtenerLotesPorClienteAPI,obtenerFardosPorLoteAPI };
// async function obtenerFardosPorLoteAPI(codigoCliente, nroLote) {
//     let con = 1;
//     const limiteFardo = "100"; 
//     const año = "2020";
//     let skip = 0;
//     const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
//     try {
//         const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": 50, "Skip": 0, "NroLote": nroLote });
//         const totales = data.Total;
//         console.log("Total Lotes Cliente HYD NRO LOTE " + nroLote  + "TOTALES " + totales)
//         for (let i = 0; i < totales; i = i + 100) {
//             const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteFardo, "Skip": skip });
//             skip = skip + limiteFardo;
//             await guardarFardos(dataConSkip);

//         }
   
//     } catch (ex) {
//         console.log("Error en obtenerFardosPorLoteAPI");
//         console.log(ex);
//     }
// }


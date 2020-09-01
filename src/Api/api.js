const axios = require('axios');
const APIKEY = process.env.APIKEY;

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
            await guardarLotes(dataConSkip);
        }
    } catch (ex) {
        console.log(ex);
    }
}

async function obtenerFardosPorLoteAPI(codigoCliente, nroLote) {
    const limiteFardo = "100"; 
    const año = "2020";

    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": nroLote });
        await guardarFardos(data);
    } catch (ex) {
        console.log(ex);
    }
}

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



const modelo = require('./src/Modelo/modelo');
const axios = require('axios');
const APIKEY = "3YEU2OTMAQ";

function guardarLotes(lotes) {
     const lotesPromesas = lotes.LoteDetails.map((lote) => {
        return modelo
            .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], codigoCliente, new Date())
            .then(() => {
                return obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote']);
            })
            .catch(err => {
                console.log(err);
            });
    });
    return Promise.all(lotesPromesas)
}

function guardarFardos(data) {
    const fardosPromesa = data.Fardos.map((fardo) => {
        return modelo
            .insertFardo(codigoCliente, data.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
            .then(() => {
                console.log("Guardando Nro Lote: " + data.NroLote + " Nro Fardo: " + fardo['Num']  + " Cliente: " + codigoCliente );
            })
            .catch(err => {
                console.log(err);
            });
    });
    return Promise.all(fardosPromesa);
}

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

// async function obtenerFardosPorLoteAPI(codigoCliente, nroLote) {
//     // Esta funcion es por si puede haber mas de 52 Fardos por lotes
//     const limiteFardo = "100"; 
//     const año = "2020";
//     let skip = 0;
//     const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
//     try {
//         const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": nroLote });
//         const totales = data.Total;
//         for (let i = 0; i < totales; i = i + 100) {
//             const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteFardo, "Skip": skip, "NroLote": nroLote });
//             skip = skip + limiteFardo;
//             await guardarFardos(dataConSkip);

//         }
   
//     } catch (ex) {
//         console.log(ex);
//     }
// }

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


async function vaciarTablas(){
    await modelo.vaciarLotes();
    await modelo.vaciarFardos();
}

let codigoCliente;
const año = '2020';

async function correrIndividual(){
    await vaciarTablas();
    codigoCliente = 'cre';
    try {
       await obtenerLotesPorClienteAPI(codigoCliente, año);
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        return;
    }
    console.log("Finalizo la ejecucion del programa");
}

async function correr() {
    vaciarTablas();
    const clientes = modelo.traerClientesJson();
    try {
        for (let i = 0; i < clientes.length; i++) {
            codigoCliente = clientes[i].codigoCliente
            await obtenerLotesPorClienteAPI(codigoCliente, año);
        }
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        
    }
    console.log("Finalizo la ejecucion del programa");
}
//correrIndividual();
correr();
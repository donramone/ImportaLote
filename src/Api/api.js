const axios = require('axios');
const servicio = require('../Servicio/servicio.js');
const lote = require('../Mapeadores/loteMapper');
const fardo = require('../Mapeadores/fardoMapper');
const test = require('../Mapeadores/testMapper');
//const APIKEY = process.env.APIKEY;
APIKEY = "3YEU2OTMAQ"
// NO me funciono bien el process.env asi que por ahora no me meto con eso, tambien desp quitare pasar como parametro el año.


async function obtenerLotesPorClienteAPI(codigoCliente, año) {
    console.log("lotes clientes " + codigoCliente)
    const limiteLote = 50;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = data.TotalLotes;
        for (let i = 0; i < totales; i = i + 50) {
            const { data: dataConSkip } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
            skip = skip + limiteLote;

            //Trancado aca: EN DEVOLVER EL JSON UNA VEZ QUE TENGA TODOS LOS "dataConSkip"
            await servicio.guardarLotes(dataConSkip);
            await obtenerFardosPorLoteAPI(dataConSkip);
            console.log(dataConSkip)
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

// Las funciones en ingles son con las que pruebo para desacoplar las anteriores.
async function getLotesByCliente(codigoCliente, año) {
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    const limiteLote = 50;
    let skip = 0;
    let listaLotes = [];
    try {
        const { data : lotes } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": "0" });
        const totales = lotes.TotalLotes;
        for (let i = 0; i < totales; i = i + 50) {
            const { data} = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": codigoCliente, "Año": año, "Take": limiteLote, "Skip": skip });
            skip = skip + limiteLote;
            data.LoteDetails.map((detallesLote) => {
                // aca no se si esta bien pasar asi, como segundo parametro el codigo del cliente
                const newLote = new lote({detallesLote,cliente: data['CodigoCliente']});
                listaLotes.push(newLote);
            });
        }
    } catch (ex) {
        console.log(ex);
    }
    return listaLotes;
}

async function getFardosByLote(lotes) {
    //console.log(lotes)
    const limiteFardo = "100";
    const año = "2020";
    let listaFardo = [];
    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    try {
        lotes.map(async (lote) => {
            const { data } = await axios.post(END_POINT, { "key": APIKEY, "CodigoCliente": lote.cliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": lote.nroLote });
            data.Fardos.map((item) => {
                //Nuevamente agrego parametros, porque no pude parsear solo el parametro data con el mapper
                const newFardo = new fardo({item,Cliente: data['CodigoCliente'],NroLote: data['NroLote']});       
                listaFardo.push(newFardo);
            });
        });
    } catch (ex) {
        console.log(ex);
    }
    console.log(listaFardo);
    return listaFardo;
}

module.exports = { obtenerLotesPorClienteAPI, obtenerFardosPorLoteAPI, getLotesByCliente, getFardosByLote };

const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
const api = require('../Api/api.js');

async function vaciarTablas(){
    await modelo.vaciarLotes();
    await modelo.vaciarFardos();
}

/* async function getLotes(){
    const lotes =  await api.obtenerLotes("HYD");
    console.log(lotes);
}
 */
function guardarLotes(lotes) {
    const lotesPromesas = lotes.LoteDetails.map((lote) => {
        return modeloLote
            .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], lotes.CodigoCliente, new Date())
            .then(() => {
                return obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote']);
            })
            .catch(err => {
                console.log(err);
            });
    });
    return Promise.all(lotesPromesas)
}

function guardarFardos(fardos) {
    const fardosPromesa = fardos.Fardos.map((fardo) => {
        return modeloFardo
            .insertFardo(fardos.CodigoCliente, fardos.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
            .then(() => {
                console.log("Guardando Nro Lote: " + fardos.NroLote + " Nro Fardo: " + fardo['Num']  + " Cliente: " + fardos.CodigoCliente );
            })
            .catch(err => {
                console.log(err);
            });
    });
    return Promise.all(fardosPromesa);
} 

module.exports = {vaciarTablas,guardarLotes, guardarFardos, getLotes};

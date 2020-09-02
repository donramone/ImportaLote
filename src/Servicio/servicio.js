const modeloLote = require('../Modelo/lote.js');

async function vaciarTablas(){
    await modelo.vaciarLotes();
    await modelo.vaciarFardos();
}

// export function obtenerLotesPorCliente(cliente){
//   //lama a la API
// }


function guardarLotes(lotes) {
   
     const lotesPromesas = lotes.LoteDetails.map((lote) => {
        return modeloLote
            .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], lotes.CodigoCliente, new Date())
            .then(() => {
            //    return obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote']);
            })
            .catch(err => {
                console.log(err);
            });

    });
    return Promise.all(lotesPromesas)
}

// export function guardarFardos(fardos) {
//     const fardosPromesa = fardos.map((fardo) => {
//         return modelo
//             .insertFardo(codigoCliente, data.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
//             .then(() => {
//                 console.log("Guardando Nro Lote: " + data.NroLote + " Nro Fardo: " + fardo['Num']  + " Cliente: " + codigoCliente );
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     });
//     return Promise.all(fardosPromesa);
// }

module.exports = {vaciarTablas,guardarLotes};
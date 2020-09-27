/* eslint-disable max-len */
const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
// const api = require('../Api/api.js');

async function vaciarTablas() {
  // await modelo.vaciarLotes();
  // await modelo.vaciarFardos();
}

async function getLotesAPI(cliente, anio) {
  // const lotes = 
}

async function guardarLotes(lotes) {
  const lotesPromesas = lotes.map(async (item) => {
    await modeloLote
      .insertLote(item.nroLote, item.calidad, item.fardos, item.resistencia, item.promedio, item.colores, item.codMicro, item.longitud, item.paquetes, item.micronaire, item['año'], item.estado, item.codigoEstado, item.cliente, new Date());
    console.log(`Guardando Lote Nro: ${item.nroLote} Cliente: ${item.cliente}`);
  });
  return Promise.all(lotesPromesas);
}

async function guardarFardos(fardos) {
  fardos.forEach((fardo) => {
    const fardosPromesa = fardo.map(async (item) => {
      await modeloFardo
        .insertFardo(item.codCliente, item.nroLote, item.nroFardo, item.calidad, item.codCalidad, new Date());
      console.log(`Guardando Fardo Nro Lote: ${item.nroFardo} del lote Nro: ${item.nroLote} Cliente: ${item.codCliente}`);
    });
    return Promise.all(fardosPromesa);
  });
}

function insertFardo(fardos) {
  // Con el forEach no puedo usar el await en modeloFardo, funciona pero me indica que el programa
  // termino mientras sigue insertando records, con el map de guardarFardos no me sucede.
  fardos.forEach((fardo) => {
    fardo.forEach((item) => {
      modeloFardo.insertFardo(item.codCliente, item.nroLote, item.nroFardo, item.calidad, item.codCalidad, new Date());
      console.log(`Insert Nro Lote: ${item.nroLote} Nro Fardo: ${item.nroFardo} Cliente: ${item.codCliente}`);
    });
  });
}

module.exports = {
  vaciarTablas, guardarLotes, guardarFardos, getLotes: getLotesAPI, insertFardo,
};

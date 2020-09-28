/* eslint-disable max-len */
const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
const api = require('../Api/api.js');

async function vaciarTablas() {
  await modeloLote.vaciarLotes();
  await modeloFardo.vaciarFardos();
}

async function saveLotes(lotes) {
  const lotesPromesas = lotes.map(async (item) => {
    await modeloLote
      .insertLote(item.nroLote, item.calidad, item.fardos, item.resistencia, item.promedio, item.colores, item.codMicro, item.longitud, item.paquetes, item.micronaire, item['año'], item.estado, item.codigoEstado, item.cliente, new Date());
    console.log(`Guardando Lote Nro: ${item.nroLote} Cliente: ${item.cliente}`);
  });
  return Promise.all(lotesPromesas);
}

async function saveFardos(fardos) {
  fardos.forEach((fardo) => {
    const fardosPromesa = fardo.map(async (item) => {
      await modeloFardo
        .insertFardo(item.codCliente, item.nroLote, item.nroFardo, item.calidad, item.codCalidad, new Date());
      console.log(`Guardando Fardo Nro Lote: ${item.nroFardo} del lote Nro: ${item.nroLote} Cliente: ${item.codCliente}`);
    });
    return Promise.all(fardosPromesa);
  });
}

async function requestAPI(cliente) {
  const lotes = await api.getLotesByCliente(cliente);
  await saveLotes(lotes);
  const fardos = await api.getFardosByLotes(lotes);
  await saveFardos(fardos);
}

module.exports = { requestAPI };

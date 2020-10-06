/* eslint-disable max-len */
// import mapearLoteApi from '../Mapeadores/loteMapper';
const mapearLoteApi = require('../Mapeadores/loteMapper');
const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
const api = require('../Api/api.js');

async function clearTables() {
  await modeloLote.vaciarLotes();
  await modeloFardo.vaciarFardos();
}

/* async function saveLotesOld(lotes) {
  const lotesPromesas = lotes.map(async (item) => {
    await modeloLote
      .insertLoteOld(item.nroLote, item.calidad, item.fardos, item.resistencia, item.promedio, item.colores, item.codMicro, item.longitud, item.paquetes, item.micronaire, item['año'], item.estado, item.codigoEstado, item.cliente, new Date());
    console.log(`Guardando Lote Nro: ${item.nroLote} Cliente: ${item.cliente}`);
  });
  return Promise.all(lotesPromesas);
} */

async function saveLote(lote) {
  const lotePromesa = lote.LoteDetails.map(async (detalleLote) => {
    await modeloLote
      .insertLote(mapearLoteApi({ detalleLote, cliente: lote.CodigoCliente }));
  });
  return Promise.all(lotePromesa);
}

async function saveFardos(fardos) {
  // fardos.forEach(async (fardosEnLote) => {
  const fardosPromesa = fardos.map(async (itemFardo) => {
    // console.log("Recorriendo el fardo " + itemFardo.nroFardo);
    await modeloFardo
    // .insertFardo(itemFardo.codigoCliente, itemFardo.nroLote, itemFardo.nroFardo, itemFardo.calidad, itemFardo.codCalidad, new Date());
      .insertFardoNew(itemFardo);
  });
  return Promise.all(fardosPromesa);
  // });
  // fardos.Fardo.forEach((itemFardo) => {
  // totalFardo = totalFardo + 1;
  /* itemFardo.forEach(async (fardo) => {
  // itemFardo.map(async (fardo) => {
  console.log(fardo);
  }); */
  /*  prome = await modeloFardo
        .insertFardoNew(fardo);
    }); */
  // });
  /* const fardosPromesa = fardos.map(async (itemFardo) => {
    await modeloFardo
      .insertFardoNew(itemFardo);
  }); */
  // return Promise.all(promesa);
}

async function requestAPI(cliente) {
  const lotes = await api.getLotesByCliente(cliente);
  for (lote of lotes) {
    await saveLote(lote);
  }

  /* itemLote.LoteDetails.map(async (item) => {
      console.log("Voy a guardar: ", item.NroLote);
      saveLote(mapearLoteApi(item));
    }); */
  // });
  /* ssss
  lotes.forEach((lote) => {vv
    console.log(lote);
    const newLote = new mapearLoteApi(lote);
    // const newLote = new mapearLoteApi({ lote, cliente: lotes.CodigoCliente });
    console.log(newLote);
  }); */

  /* lotes.LoteDetails.forEach((detallesLote) => {
    const newLote = new mapearLoteApi({ detallesLote, cliente: lotes.CodigoCliente });
    console.log(newLote);
  }); */
  // await saveLotes(lotes);
  // const fardos = await api.getFardosByLotes(lotes);
  // const prome = fardos.map(async (fardo) => {
  // console.log(fardos);
  //   await saveFardos(fardo);
  // });
  // console.log(fardos);
  // return Promise.all(prome);
}

module.exports = { requestAPI, clearTables };

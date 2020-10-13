/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const mapearLoteApi = require('../Mapeadores/loteMapper');
const mapearFardoApi = require('../Mapeadores/fardoMapper');
const modeloLote = require('../Modelo/lote.js');
const modeloFardo = require('../Modelo/fardo.js');
const api = require('../Api/api.js');

async function clearTables() {
  await modeloLote.vaciarLotes();
  await modeloFardo.vaciarFardos();
}

async function saveLotes(lotes) {
  const lotePromesa = lotes.map(async (itemLote) => {
    await modeloLote
      .insertLote(itemLote);
  });
  return Promise.all(lotePromesa);
}

async function saveFardos(fardos) {
  const fardosPromesa = fardos.map(async (itemFardo) => {
    await modeloFardo
      .insertFardoNew(itemFardo);
  });
  return Promise.all(fardosPromesa);
}

function transformarJsonLotes(lotesApi) {
  const listaLotes = [];
  for (let i = 0; i < lotesApi.length; i += 1) {
    listaLotes.push(lotesApi[i].LoteDetails.map((lote) => mapearLoteApi({ lote, Cliente: lotesApi[i].CodigoCliente })));
  }
  return (listaLotes);
}

function transformarJsonFardos(fardosApi) {
  const listaFardos = [];
  for (let i = 0; i < fardosApi.length; i += 1) {
    listaFardos.push(fardosApi[i].Fardos.map((fardo) => mapearFardoApi({ fardo, Cliente: fardosApi[i].CodigoCliente, NroLote: fardosApi[i].NroLote })));
  }
  return (listaFardos);
}

function getNroLote(listaLotes) {
  // ESTA FUNCION ME PARECE INNECESARIA:
  // LA SEPARE PARA LIMPIAR UN POCO MIS BUCLES PERO ESPERO PODER OBTENER LOS NRO SIN TANTOS FOREACH
  const listaNroLotes = [];
  listaLotes.forEach((lotes) => {
    lotes.forEach((itemLote) => {
      listaNroLotes.push(itemLote.nroLote);
    });
  });
  return listaNroLotes;
}
async function requestAPI(cliente) {
  // Uso for of porque me dio problemas el foreach y veo que usan eso
  // de todos modos quiero quitar esos for creo que lo puedo hacer si armo bien mi listaLotes
  const fardosApi = [];
  const lotesApi = await api.getLotesByCliente(cliente);
  const listaLotes = transformarJsonLotes(lotesApi);
  for (const lotes of listaLotes) {
    await saveLotes(lotes);
  }
  const listaNroLotes = getNroLote(listaLotes);
  for (const nroLote of listaNroLotes) {
    fardosApi.push(await api.getFardosDetailsByNroLote(cliente, nroLote));
  }
  const listaFardos = transformarJsonFardos(fardosApi);
  for (const fardos of listaFardos) {
    await saveFardos(fardos);
  }

  /* EL "await inside a loop" estaria mal? lo debeia tratar asi:??
  const promesaSaveFardos = [];
  for (const fardos of listaFardos) {
    promesaSaveFardos.push(saveFardos(fardos));
  }
  const responseSaveFardos = await Promise.all(promesaSaveFardos);
  */
}

module.exports = { requestAPI, clearTables };

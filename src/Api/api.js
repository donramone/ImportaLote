/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const axios = require('axios');
const Lote = require('../Mapeadores/loteMapper');
const Fardo = require('../Mapeadores/fardoMapper');

const fecha = new Date();
const anio = fecha.getFullYear();
// const APIKEY = process.env.APIKEY;
const APIKEY = '3YEU2OTMAQ';
const END_POINT_LOTES = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
const END_POINT_FARDOS = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
// NO me funciono bien el process.env asi que por ahora no me meto con eso.

async function getLotesByCliente(codigoCliente) {
  const limiteLote = 50;
  let skip = 0;
  const listaLotes = [];
  try {
    const { data: lotes } = await axios.post(END_POINT_LOTES, {
      key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: '0',
    });
    const totales = lotes.TotalLotes;

    for (let i = 0; i < totales; i += 50) {
      const { data } = await axios.post(END_POINT_LOTES, {
        key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: skip, 
      });
      skip += limiteLote;
      data.LoteDetails.forEach((detallesLote) => {
        const newLote = new Lote({ detallesLote, cliente: data.CodigoCliente });
        listaLotes.push(newLote);
      });
    }
  } catch (ex) {
    console.log(ex);
  }
  return listaLotes;
}
/*
async function getAllLotes(codigoCliente) {
  const MAX_LOTE = 50;
  try {
    const { data } = await axios.post(END_POINT_LOTES, {
      key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: 50, Skip: '0',
    });
    if( data.TotalLotes > MAX_LOTE) {

    }else{
      return data;
    }
  } catch (ex) {
    console.log(ex);
  }
}
 */
async function getFardosDetailsByNroLote(cliente, nroLote) {
  const limite = '100';
  const { data } = await axios.post(END_POINT_FARDOS, {
    key: APIKEY, CodigoCliente: cliente, Año: anio, Take: limite, Skip: '0', NroLote: nroLote,
  });
  return data.Fardos.map((item) => {
    return new Fardo({ item, Cliente: data.CodigoCliente, NroLote: data.NroLote });
  });
}

async function getFardosByLotes(lotes) {
  const fardos = [];
  for (let i = 0; i < lotes.length; i += 1) {
    fardos.push(await getFardosDetailsByNroLote(lotes[i].cliente, lotes[i].nroLote));
  }
  return fardos;
}
module.exports = { getLotesByCliente, getFardosByLotes };

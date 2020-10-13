/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const axios = require('axios');
// const APIKEY = process.env.APIKEY;
const APIKEY = '3YEU2OTMAQ'; // NO me funciono bien el process.env por ahora no me meto con eso.
const END_POINT_LOTES = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
const END_POINT_FARDOS = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';

const fecha = new Date();
const anio = fecha.getFullYear();

async function getLotesByCliente(codigoCliente) {
  const limiteLote = 50;
  let skip = 0;
  const listaLotes = [];
  try {
    const { data: lotes } = await axios.post(END_POINT_LOTES, {
      key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: '0',
    });
    // Ver un IF que controle que si el total es <= 50 devuelva data sin volver a consultar la API
    const totales = lotes.TotalLotes;
    for (let i = 0; i < totales; i += 50) {
      const { data } = await axios.post(END_POINT_LOTES, {
        key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: skip,
      });
      skip += limiteLote;
      listaLotes.push(data);
    }
  } catch (ex) {
    console.log(ex);
  }
  return listaLotes;
}

async function getFardosDetailsByNroLote(codigoCliente, nroLote) {
  const limite = '100';
  const { data } = await axios.post(END_POINT_FARDOS, {
    key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limite, Skip: '0', NroLote: nroLote,
  });
  return data;
}

module.exports = { getLotesByCliente, getFardosDetailsByNroLote };

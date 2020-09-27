/* eslint-disable no-console */
const axios = require('axios');
const Lote = require('../Mapeadores/loteMapper');
const Fardo = require('../Mapeadores/fardoMapper');

const fecha = new Date();
const anio = fecha.getFullYear();
// const APIKEY = process.env.APIKEY;
const APIKEY = '3YEU2OTMAQ';
// NO me funciono bien el process.env asi que por ahora no me meto con eso.

async function getLotesByCliente(codigoCliente) {
  const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
  const limiteLote = 50;
  let skip = 0;
  const listaLotes = [];
  try {
    const { data: lotes } = await axios.post(END_POINT, {
      key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: '0',
    });
    const totales = lotes.TotalLotes;

    for (let i = 0; i < totales; i += 50) {
      const { data } = await axios.post(END_POINT, {
        key: APIKEY, CodigoCliente: codigoCliente, Año: anio, Take: limiteLote, Skip: skip, 
      });
      /* p.push(axios.post(END_POINT, {
        key: APIKEY, CodigoCliente: codigoCliente, Año: año, Take: limiteLote, Skip: skip,
       })); */
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

async function obtenerFardosPorLoteAPI(lotes) {
  console.log();
  const limiteFardo = '100';
  const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
  lotes.map(async (lote) => {
    try {
      const { data } = await axios.post(END_POINT, { key: APIKEY, CodigoCliente: lote.cliente, Año: anio, Take: limiteFardo, Skip: '0', NroLote: lote.nroLote });
      // me gustaria hacer un return de los fardos y no llamar en esta funcion a guardarFardos
      // await servicio.guardarFardos(data);
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  });
}

/* async function getFardosByNroLote(lotes) {
  const fardos = [];
  for (let i = 0; i < lotes.length; i++) {
    fardos.push(await getFardosDetailsByNroLote(lotes[i].cliente, lotes[i].nroLote));
  }
  return fardos;
} */

async function getFardosDetailsByNroLote(cliente, nroLote) {
  const limite = '100';

  const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
  const { data } = await axios.post(END_POINT, {
    key: APIKEY, CodigoCliente: cliente, Año: anio, Take: limite, Skip: '0', NroLote: nroLote,
  });
  return data.Fardos.map((item) => {
    return new Fardo({ item, Cliente: data.CodigoCliente, NroLote: data.NroLote });
  });
}

async function getFardosByLotes(lotes) {
  const fardos = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lotes.length; i++) {
    fardos.push(await getFardosDetailsByNroLote(lotes[i].cliente, lotes[i].nroLote));
  }
  return fardos;
}
module.exports = { getLotesByCliente, getFardosByLotes, obtenerFardosPorLoteAPI };

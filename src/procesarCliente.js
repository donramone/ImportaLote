// const {vaciarTablas} = require('./Servicio/servicio');
const api = require('./Api/api.js');

const servicio = require('./Servicio/servicio');
// export default async function procesarCliente(cliente, anio){

async function procesarCliente(cliente, anio) {
  // await vaciarTablas();
  try {
    // api.obtenerLotesPorClienteAPI(cliente, anio);
    const lotes = await api.getLotesByCliente(cliente, anio);
    // console.log(lotes);
    await servicio.guardarLotes(lotes);
    const fardos = await api.getFardosByLotes(lotes);
    await servicio.guardarFardos(fardos);
    //fardos.forEach((fardo) => {
    //  servicio.guardarFardos(fardo);
    //});
    //  await servicio.guardarFardos(fardos[1]);
  } catch (e) {
    console.log(e);
  }
}
module.exports = procesarCliente;

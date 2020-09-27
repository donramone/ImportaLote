const servicio = require('./Servicio/servicio');

async function procesarCliente(cliente) {
  try {
    await servicio.getLotesAPI(cliente);
  } catch (e) {
    console.log(e);
  }
}
module.exports = procesarCliente;

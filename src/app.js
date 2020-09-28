// require('dotenv').config();
const procesarCliente = require('./procesarCliente');
const servicio = require('./Servicio/servicio');

async function correr(modo) {
  if (modo === 'Prueba') {
    await procesarCliente(process.env.CODIGO_CLIENTE_PRUEBA);
    console.log('Finalizo la ejecucion del programa con el primer cliente');
    process.exit(0);
  }
  const clientes = procesarCliente.getClientJson();
  try {
    for (let i = 0; i < clientes.length; i += 1) {
      await servicio.requestAPI(clientes[i].codigoCliente);
    }
  } catch (e) {
    console.log('No se ejecuto correctamente ' + e);
  }
  console.log('Finalizo en app.js');
  process.exit(0);
}
correr();
// correr(process.env.MODO);

// require('dotenv').config();
const procesarCliente = require('./procesarCliente');
const servicio = require('./Servicio/servicio');

async function correr(modo) {
  // await servicio.clearTables();
  if (modo === 'Prueba') {
    console.log("Corriendo en modo prueba");

    const x = await servicio.requestAPI('CRE');
    // console.log(x);
    console.log('Finalizo la ejecucion del programa con el cliente CRE');
    process.exit(0);
  }
  const clientes = procesarCliente.getClientJson();
  try {
    for (let i = 0; i < clientes.length; i += 1) {
      await servicio.requestAPI(clientes[i].codigoCliente);
    }
  } catch (e) {
    console.log(`No se ejecuto correctamente ${e}`);
  }
  console.log('Finalizo en app.js');
  process.exit(0);
}
correr('Prueba');
// correr(process.env.MODO);

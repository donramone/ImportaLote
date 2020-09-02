require('dotenv').config();
const procesarCliente = require('./procesarCliente');
const {vaciarTablas} = require('./Servicio/servicio');
const modelo = require('./Modelo/cliente.js');

async function correr(modo) {
    // await vaciarTablas();

    // if(modo === 'Prueba'){
    //     await procesarCliente(process.env.CODIGO_CLIENTE_PRUEBA, 2020); //si el año tiene que ser el actual usá el método Date()
    //     console.log("Finalizo la ejecucion del programa con el primer cliente");
    //     process.exit(0);
    // }

    const clientes = modelo.traerClientesJson();
    try {
        for (let i = 0; i < clientes.length; i++) {
            console.log(clientes[i].codigoCliente);
            await procesarCliente(clientes[i].codigoCliente, 2020); //si el año tiene que ser el actual usá el método Date()
        }
    } catch (e) {
        console.log("No se ejecuto correctamente " + e);
        
    }
    console.log("Finalizo la ejecucion del programa");
}

correr(process.env.MODO);

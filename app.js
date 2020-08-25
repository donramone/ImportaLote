const transformador = require('./src/transformador');
const modelo = require('./src/Modelo/modelo');
const axios = require('axios');

//-------------------------------
// function guardarLotes(lotes) {
//     console.log("En guardar lotes");
//     lotes.LoteDetails.forEach((lote) => {
//         modelo
//             .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], codigoCliente, new Date())
//             .then(() => {
//                 //CodigoCliente, NroLote,Numfardo, Calidad,CodCalidad,fechaCreacion
//                 obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote'], lote);
//             })
//             .catch(err => {
//                 console.log(err);
//             });

//     });
// }
//----------------------------------

function guardarLotes(lotes) {

    const lotesPromesas = lotes.LoteDetails.map((lote) => {

        return modelo
            .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], codigoCliente, new Date())
            .then(() => {

                // IMPORTANTE: como este obtenerFardosPorLoteAPI es una función asíncrona tenemos que devolverla en el then, para que se encadenen
                // pensar con el then es bastante más complicado, optimamente te recomendaría pasar esta función a async/await
                // return obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote'], lote);
                return obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote']);
            })
            .catch(err => {
                console.log(err);
            });
    });

    return Promise.all(lotesPromesas)
}


function guardarFardos(data) {

    // Esto va a ser un array con todas las promesas, notá que usamos `map` en vez de forEach para que nos devuelva un array nuevo
    // fardosPromesa = [insertFardo(1), insertFardo(2), ...] donde cada insertFardo es como un "proceso" que está insertando cada fardo
    const fardosPromesa = data.Fardos.map((fardo) => {

        return modelo
            .insertFardo(codigoCliente, data.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
            .then(() => {
                //  actualizarLoteServisoft(transformador.obtenerCalidad(fardo['Calidad']), lotes['Resistencia'], lotes['Longuitud'], lotes['Micronaire'], lotes['Colores'], transformador.obtenerCliente(codigoCliente), fardo['Num'], transformador.obtenerFechaCiclo());
                //console.log("NO Actualizando servisoft");
                console.log("Guardando Fardo Nro: " + fardo['Num'] + " Cliente: " + codigoCliente + " Nro Lote: " + data.NroLote);
            })
            .catch(err => {
                console.log(err);
            });
    });
    // Promise.all() va a resolver cuando todos los procesos acá adentro terminen
    return Promise.all(fardosPromesa);

    // data.Fardos.forEach((fardo) => {
    //     modelo
    //         .insertFardo(codigoCliente, data.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
    //         .then(() => {
    //             actualizarLoteServisoft(transformador.obtenerCalidad(fardo['Calidad']), lotes['Resistencia'], lotes['Longuitud'], lotes['Micronaire'], lotes['Colores'], transformador.obtenerCliente(codigoCliente), fardo['Num'], transformador.obtenerFechaCiclo());
    //             console.log("Actualizando servisoft");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    // });
}

function actualizarLoteServisoft(calidad, resistencia, heb, micronaire, colores, codCliente, numFardo, ciclo) {
    modelo.actualizarFardo(calidad, resistencia, heb, micronaire, colores, codCliente, numFardo, ciclo)
        .then((r) => {
            console.log("Se acutalizo servisoft: " + r);
        })
        .catch(err => {
            console.log(err);

        });
}
//------------------
// async function obtenerLotesPorClienteAPI(cliente, año) {
//     const limite = 50;
//     let skip = 0;
//     console.log("En lotes por cliente");
//     const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
//     try {

//         // Tene en cuenta que no importa el seteo del limite el TOTAL siempre da lo mismo
//         const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": "0" });
//         //Controlar que traiga datos
//         const totales = data.TotalLotes;

//         for (let i = 0; i < totales; i = i + 50) {
//             const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": skip });
//             skip = skip + limite;
//             guardarLotes(data);
//             console.log("En lotes por cliente despues del llamado a guardar en lotes:");
//         }

//     } catch (ex) {
//         console.log(ex.data);

//     }
// }
//---------------------

async function obtenerLotesPorClienteAPI(cliente, año) {
    const limite = 50;
    let skip = 0;
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {
        // Tene en cuenta que no importa el seteo del limite el TOTAL siempre da lo mismo
        const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": "0" });
        const totales = data.TotalLotes;
        for (let i = 0; i < totales; i = i + 50) {
            const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": skip });
            skip = skip + limite;
            // ESTE ES EL CAMBIO IMPORTANTE, como esta es una función async ya devuelve una promesa, lo que hay que hacer acá es asegurarnos que este guardarLotes terminó antes de terminar la función

            await guardarLotes(data);
        }
    } catch (ex) {
        console.log(ex.data);
    }
}



async function obtenerFardosPorLoteAPI(cliente, nroLote) {
    // aca estoy haciendo un pasamano con itemLote porque lo necesito en guardarFaro, mala practica ver como solucionarlo.
    console.log("En Fardos por lotes - CLIENTE: " + cliente);
    const limiteFardo = "60"; // LA API no tiene un limite para el fardo.Igualmente por lote siempre deberia tener 52 Fardos. 
    const año = "2020";

    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    try {
        const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": nroLote });

        //  guardarFardos(data, itemLote); <-- no hacer esto

        await guardarFardos(data); // <-- esto sí está bien
    } catch (ex) {
        console.log(ex.data);
    }
}

function obtenerTotalLotesDB(cliente) {
    //Agregar año
    modelo.traerLotesPorCliente(cliente)
        .then((r) => {
            console.log(r.total);
        })
        .catch(err => {
            console.log("No se pudo traer totales: " + err.sqlMessage);

        });
}

async function obtenerTotalLotesAPI(cliente) {
    const año = "2020";
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {

        const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": "5", "Skip": "0" });

        console.log(data.TotalLotes);
        return data.TotalLotes;

    } catch (ex) {
        console.log(ex.data);

    }
}

//-- Aca funciona de  a un cliente //
const año = '2020';
//let codigoCliente = 'act';
//obtenerLotesPorClienteAPI(codigoCliente, año);


//-----Aca no puedo recorrer para que me tome los clientes desde el JSON -----


const clientes = modelo.traerClientesJson();
// async function recorrerClientesPromesa (clientes){
//     clientes.map(async (cliente) => {
//         codigoCliente = cliente.codigoCliente
//         //console.log(codigoCliente);
//         return  obtenerLotesPorClienteAPI(codigoCliente, año);
               
//     })
// }

// const cR = await xxx(clientes);
// cR.then(() => {
//      console.log("El programa en CR finalizo correctamente ");
//     })
//         .catch(err => {
//             console.log("no guardo bien los datos " + err);
//         });


// const clientesResueltos = await Promise.all(clientesPromesas);



//  const clientesPromesas = clientes.map(async (cliente) => {
//      return obtenerLotesPorClienteAPI(cliente.codigoCliente, año);
//  })

 // clientesResueltos.then(() => {
//     console.log("El programa finalizo correctamente ");
// })
//     .catch(err => {
//         console.log("no guardo bien los datos " + err);
// });

/// este codigo solo me funciona con un solo cliente ACT
//  const clientesPromesas = clientes.map((cliente) => {
  
//      codigoCliente = cliente.codigoCliente
//      return obtenerLotesPorClienteAPI(codigoCliente, año);
    
//  })

// const clientesResueltos = Promise.all(clientesPromesas);
// clientesResueltos.then(() => {
//     console.log("El programa finalizo correctamente ");
// })
//     .catch(err => {
//         console.log("no guardo bien los datos " + err);
//     });

const transformador = require('./src/transformador');
const modelo = require('./src/Modelo/modelo');
const axios = require('axios');

function guardarLotes(lotes) {
    console.log("En guardar lotes");
    lotes.LoteDetails.forEach((lote) => {
        modelo
            .insertLote(lote['NroLote'], lote['Calidad'], lote['Fardos'], lote['Resistencia'], lote['Promedio'], lote['Colores'], lote['CodMicro'], lote['Longuitud'], lote['Paquetes'], lote['Micronaire'], lote['Año'], lote['Estado'], lote['CodEstado'], codigoCliente, new Date())
            .then(() => {
                //CodigoCliente, NroLote,Numfardo, Calidad,CodCalidad,fechaCreacion
                obtenerFardosPorLoteAPI(codigoCliente, lote['NroLote'], lote);
            })
            .catch(err => {
                console.log(err);
            });
           
    });
}

function guardarFardos(data, lotes) {
    data.Fardos.forEach((fardo) => {
        modelo
            .insertFardo(codigoCliente, data.NroLote, fardo['Num'], fardo['Calidad'], fardo['CodCalidad'], new Date())
            .then(() => {
                actualizarLoteServisoft(transformador.obtenerCalidad(fardo['Calidad']), lotes['Resistencia'], lotes['Longuitud'], lotes['Micronaire'], lotes['Colores'], transformador.obtenerCliente(codigoCliente), fardo['Num'], transformador.obtenerFechaCiclo());
                console.log("Actualizando servisoft");
            })
            .catch(err => {
                console.log(err);
            });

    });
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

async function obtenerLotesPorClienteAPI(cliente, año) {
    const limite = 50;
    let skip = 0;
    console.log("En lotes por cliente");
    const END_POINT = 'https://gestionstock.southmsnet.com.ar/extranet/GetLotesByCliente';
    try {

        // Tene en cuenta que no importa el seteo del limite el TOTAL siempre da lo mismo
        const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": "0" });
        //Controlar que traiga datos
        const totales = data.TotalLotes;

        for (let i = 0; i < totales; i = i + 50) {
            const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limite, "Skip": skip });
            skip = skip + limite;
            guardarLotes(data);
            console.log("En lotes por cliente despues del llamado a guardar en lotes:");
        }

    } catch (ex) {
        console.log(ex.data);

    }
}

async function obtenerFardosPorLoteAPI(cliente, nroLote, itemLote) {
    // aca estoy haciendo un pasamano con itemLote porque lo necesito en guardarFaro, mala practica ver como solucionarlo.
    console.log("En Fardos por lotes");
    const limiteFardo = "60"; // LA API no tiene un limite para el fardo.Igualmente por lote siempre deberia tener 52 Fardos. 
    const año = "2020";

    const END_POINT = ' https://gestionstock.southmsnet.com.ar/extranet/GetFardosByLote';
    try {
        const { data } = await axios.post(END_POINT, { "key": "3YEU2OTMAQ", "CodigoCliente": cliente, "Año": año, "Take": limiteFardo, "Skip": "0", "NroLote": nroLote });
        guardarFardos(data, itemLote);
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

const codigoCliente = 'HYD';
obtenerLotesPorClienteAPI(codigoCliente, '2020');

// const clientes = modelo.traerClientesJson();
// clientes.forEach((cliente) => {
//     console.log(cliente.codigoCliente);
// })
const Test = require('../Entidades/test');

module.exports = function mapearTest(datosApi) {
    const {
        id:id,
        nombre:nombre
    } = datosApi;
    
    return new Test({
        id,
        nombre
    })
}
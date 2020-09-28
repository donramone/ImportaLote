const fs = require('fs');

module.exports = {
  traerClientesJson() {
    try {
      return JSON.parse(fs.readFileSync('Data/clientes.json'));
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('No se encontró el archivo clientes.json!');
      } else {
        throw err;
      }
    }
  },
};

const fs = require('fs');

function getClientJson() {
  let clientes = [];
  try {
    clientes = JSON.parse(fs.readFileSync('Data/clientes.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No se encontró el archivo clientes.json!');
    } else {
      throw err;
    }
  }
  return clientes;
}

module.exports = { getClientJson };

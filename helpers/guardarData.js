const fs = require('fs');

const path = './db/data.json';


// Crea y Guarda la informacion recibida en un archivo JSON
const guardarData = ( data ) => {

    fs.writeFileSync(path, JSON.stringify(data));

}

// Funcion que lee el archivo JSON que contiene los datos
const leerData = () => {

    // Si no existe el archivo devuelve null
    if ( !fs.existsSync(path) ) {
        return null;
    }

    // Se leen los datos deñ archivo JSON y se devuelven los datos
    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarData,
    leerData
}
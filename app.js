const { inquirerMenu, pausa } = require('./helpers/menu');

console.clear();

const main = async() => {

    let opt = '';

    do{
        
        opt = await inquirerMenu();
        await pausa();

    }while( opt !== '0');

};

main();
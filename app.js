const { mainMenu, pausa } = require('./helpers/menu');

console.clear();

const main = async() => {

    let opt = '';

    do{
        
        opt = await mainMenu();
        await pausa();

    }while( opt !== '0');

};

main();
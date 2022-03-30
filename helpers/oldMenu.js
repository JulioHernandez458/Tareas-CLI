/* 
    Antiguo menu, que no se utiliza en la version final de la aplicacion
    ESTE ARCHIVO NO SE UTILIZA.
*/

require('colors');


// Menu de opciones por consola, usando stfin y stdout 
const mainMenu = () => {

    return new Promise(resolve => {

        console.clear();

        console.log('==========================='.cyan);
        console.log('   Seleccione una opción   '.cyan);
        console.log('==========================='.cyan);

        console.log(`${'1.'.cyan} Crear Tarea`);
        console.log(`${'2.'.cyan} Listar Tarea`);
        console.log(`${'3.'.cyan} Listar Tareas Completadas`);
        console.log(`${'4.'.cyan} Listar Tareas Pendientes`);
        console.log(`${'5.'.cyan} Completar Tarea(s)`);
        console.log(`${'6.'.cyan} Borrar Tarea`);
        console.log(`${'0.'.cyan} Salir \n`);

        const readline = require('readline').Interface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });

    })

};  


const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').Interface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readline.question(`\nPresione ${'ENTER'.cyan} para continuar...\n`, ( opt ) => {
            readline.close();
            resolve();
        });

    })
};

module.exports = {
    mainMenu,
    pausa
}
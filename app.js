const { guardarData, leerData } = require('./helpers/guardarData');
const { inquirerMenu, pausa, leerInput } = require('./helpers/menu');

const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';

    const tareas= new Tareas();

    const cargarDB = leerData();

    if( cargarDB ){
        tareas.cargarTareas(cargarDB);
    }

    do{
        
        opt = await inquirerMenu();


        switch(opt){
            case '1':
                //Crear Tarea
                const desc = await leerInput('Descripción de la tarea: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                //Listar Tareas
                tareas.listadoCompleto();
                break;
        }

        guardarData( tareas.listadoTareas );

        await pausa();
        

    }while( opt !== '0');

};

main();
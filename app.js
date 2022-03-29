const { guardarData, leerData } = require('./helpers/guardarData');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar, 
        listadoChecklist,
        confirmarBorrar } = require('./helpers/menu');

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
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await listadoChecklist( tareas.listadoTareas );
                tareas.tareasCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoTareas );
                if (id !== '0') {
                    const ok = await confirmarBorrar('¿Está seguro de que desea borrar?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada.');
                    }
                }
                break;
        }

        guardarData( tareas.listadoTareas );

        await pausa();
        

    }while( opt !== '0');

};

main();
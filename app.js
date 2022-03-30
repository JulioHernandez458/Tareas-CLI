/*

Aplicación de consola interactiva con el usuario, donde el
usuario podra agregar tareas, listar las tareas ver su estado 
(completadas/pendientes), completar tareas, borrar tareas.
Archivo que continene la funcion principal de la aplicacion.

*/

const { guardarData, leerData } = require('./helpers/guardarData');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar, 
        listadoChecklist,
        confirmarBorrar } = require('./helpers/menus');

const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';

    const tareas= new Tareas();

    //Carga los datos del archivo json al objeto de la clase Tareas
    const cargarDB = leerData();
    if( cargarDB ){
        tareas.cargarTareas(cargarDB);
    }

    do{
        
        opt = await inquirerMenu();


        // Menu de opciones
        switch(opt){
            case '1': // 1. Crear Tarea
                const desc = await leerInput('Descripción de la tarea: ');
                tareas.crearTarea( desc );
                break;
            case '2': // 2. Listar Tareas
                tareas.listadoCompleto();
                break;
            case '3': // 3. Listar Tareas Completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // 4. Listar Tareas Pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // 5. Completar Tarea(s)
                const ids = await listadoChecklist( tareas.listadoTareas );
                tareas.tareasCompletadas(ids);
                break;
            case '6': // 6. Borrar Tarea 
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

        // Se guardar las tareas del arreglo listadoTareas a un JSOn
        guardarData( tareas.listadoTareas );

        await pausa();
        

    }while( opt !== '0');

};

main();
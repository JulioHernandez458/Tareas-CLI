/*
    Clase modelo que manejara las tareas
*/

require('colors');

const Tarea = require('./tarea');

class Tareas{

    _listado = {};

    constructor() {
        this._listado = {};
    }

    // Metodo que crea una tarea en base a una descripción
    crearTarea( desc ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }


    /*
        Metodo que llena al objeto _listado
        con la información proveniente del archivo 
        JSON que se carga al inicio.
    */
    cargarTareas( tareas= [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    // Metodo que devuelve un arreglo proveniente del objeto _listado
    get listadoTareas(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })
        return listado;
    }


    /*
        Imprime en consola todas las tareas existentes del arreglo listadoTareas.
        metodo de la opción 2.
    */
    listadoCompleto() {

        console.log();
        
        this.listadoTareas.forEach( (tarea, index) => {

            const i = `${ index + 1 }.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;

            console.log(`${ i } ${ desc } :: ${ estado }`);
        })

    }

    /*
        Metodo que imprime las tareas completas y/o pendientes que hay.
        Metodo de la opcion 3 y 4
    */
    listarPendientesCompletadas( completadas ) {

        console.log();
        let i = 0;

        this.listadoTareas.forEach( tarea => {
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;

            if( completadas ){

                if( completadoEn ){
                    i += 1;
                    console.log(`${ ( i + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }

            }else{

                if( !completadoEn ){
                    i += 1;
                    console.log(`${ ( i + '.').green } ${ desc } :: ${ 'Pendiente'.red }`);
                }

            }
        })

    }


    /*
        Metodo que recibe un ID de la tarea que se va a borrar.
        Metodo de la opcion 6        
    */
    borrarTarea( id ){

        if( this._listado[id] ){
            delete this._listado[id];
        }

    }

    /*
        Metodo que recibi un arreglo de ids para agregar la 
        tarea como completada o pendiente.
        Metodo de la opción 5.
    */
    tareasCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoTareas.forEach( tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;
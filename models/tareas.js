require('colors');

const Tarea = require('./tarea');

class Tareas{

    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea( desc ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    cargarTareas( tareas= [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    get listadoTareas(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })
        return listado;
    }

    listadoCompleto() {

        console.log();
        
        this.listadoTareas.forEach( (tarea, index) => {

            const i = `${ index + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;

            console.log(`${ i } ${ desc } :: ${ estado }`);
        })

    }

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
                    console.log(`${ ( i + '.').green } ${ desc } :: ${ completadoEn }`);
                }

            }else{

                if( !completadoEn ){
                    i += 1;
                    console.log(`${ ( i + '.').green } ${ desc } :: ${ completadoEn }`);
                }

            }
        })

    }

    borrarTarea( id ){

        if( this._listado[id] ){
            delete this._listado[id];
        }

    }

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
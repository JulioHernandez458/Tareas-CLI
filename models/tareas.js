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

}

module.exports = Tareas;
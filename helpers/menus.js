/*
    Archivo donde se encuentran todas las construcciones de
    los menus utilizados en la aplicación utilizando el modulo
    de inquirer para crearlos.
*/

const inquirer = require('inquirer');
const colors = require('colors');

// Lista de las opciones del menu que se podran seleccionar
const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();

    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.white);
    console.log('=========================== \n'.green);

    const { option } = await inquirer.prompt(preguntas);

    return option;

}


// Se crea un input vacion como pausa en la aplicación
const pausa = async () => {

    const presioneEnter = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar...`
        }
    ]

    console.log('\n');

    await inquirer.prompt(presioneEnter);

}

// Input para ingresar la descripcion de la tarea en la opción 1 
const leerInput = async ( mensaje ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate( value ){
                if ( value.length === 0 ){
                    return 'Por favor ingrese un valor!';
                }
                return true;
            }

        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;

}


/*  
    Funcion que lista todas las tareas para borrar una. 
    opcion 6 del menu.
*/
const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Tarea a borrar',
            choices: choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}


// Input de la confirmacion para borrar una tarea
const confirmarBorrar = async ( mensaje ) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }    
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}


// Listado tipo checkbox para seleccionar una o varias opciones a completar o anular tareas
const listadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }

    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrar,
    listadoChecklist
}
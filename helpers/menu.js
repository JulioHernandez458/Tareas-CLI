const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear Tarea'
            },
            {
                value: '2',
                name: '2. Listar Tareas'
            },
            {
                value: '3',
                name: '3. Listar Tareas Completadas'
            },
            {
                value: '4',
                name: '4. Listar Tareas Pendientes'
            },
            {
                value: '5',
                name: '5. Completar Tarea(s)'
            },
            {
                value: '6',
                name: '1. Borrar Tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();

    console.log('===========================');
    console.log('   Seleccione una opción   ');
    console.log('=========================== \n');

    const { option } = await inquirer.prompt(preguntas);

    return option;

}

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

module.exports = {
    inquirerMenu,
    pausa
}
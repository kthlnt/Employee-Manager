const db = require('./config/connection');
const inquirer = require('inquirer');


function mainmenu() {

  inquirer.prompt({
    type: 'list', 
    name: 'task', 
    message: 'select query from list', 
    choices: [
      'view departments', 
      'add department',
      'view roles', 
      'add role',
      'view employees',
      'add employee',
      'update employee role',
      'exit'
    ]
  }).then(answers => {
    console.log(answers)
    switch (answers.task) {
      case 'view departments': 
          viewDepartments()
        break;
        case 'add department':
          addDepartment()
        break;
        case 'view roles': 
          viewRoles()
        break;
        case 'add role':
          addRole()
        break;
        case 'view employees': 
          viewEmployees()
        break;
        case 'add employee':
          addEmployee()
        break;
        case 'update employee role':
          updateEmployee()
        break;
        case 'exit':
          db.end()
  
        break;
    }
  })
}

const viewDepartments= () => {
  db.promise().query('SELECT * FROM department').then(([response]) => {
    console.table(response)
    mainmenu()
  });

}
const viewRoles= () => {
  db.promise().query('SELECT * FROM roles').then(([response]) => {
    console.table(response)
    mainmenu()
  });
}
const viewEmployees= () => {
  db.promise().query('SELECT * FROM employee').then(([response]) => {
    console.table(response)
    mainmenu()
  });
}
mainmenu()

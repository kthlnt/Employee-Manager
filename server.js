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
//view dept
const viewDepartments= () => {
  db.promise().query('SELECT * FROM department').then(([response]) => {
    console.table(response)
    mainmenu()
  });

}
//add dept
const addDepartment = () => {
  console.log('You are adding a new department to the database.')
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'dept_name',
              message: 'Department Name:',
          }
      ])

      .then((response) => {

          // Inserting gathered info from inquirer into the department table in the database
          db.query('INSERT INTO department (dept_name) VALUE (?)', response.dept_name)

          // Displaying table with new department added.
          db.query('SELECT * FROM department', function (err, res) {
              if (err) {
                  throw err
              }
              else {
                  console.table(res)
                  console.log('Department successfully added. See the new complete list of departments above^^^.')
                  mainmenu()
              }
          })
      })
}


//view roles
const viewRoles= () => {
  db.promise().query('SELECT * FROM roles').then(([response]) => {
    console.table(response)
    mainmenu()
  });
}
//view employees
const viewEmployees= () => {
  db.promise().query('SELECT * FROM employee').then(([response]) => {
    console.table(response)
    mainmenu()
  });
}
//add employees
const addEmployee = () => {
  console.log('You are adding a new employee to the employee_db database.')

  inquirer
      .prompt([
          {
              type: 'input',
              name: 'first_name',
              message: 'First Name:',
          },
          {
              type: 'input',
              name: 'last_name',
              message: 'Last Name:',
          },
          {
              type: 'input',
              name: 'role_id',
              message: 'Role ID:',
          },
          {
              type: 'input',
              name: 'manager_id',
              message: 'Manager ID:',
          },
      ])

      .then((response) => {
          const employee = [
              response.first_name,
              response.last_name,
              parseInt(response.role_id),
              response.manager_id === 'null' ? null : parseInt(response.manager_id)
          ]
          
          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', employee)

        
          db.query('SELECT * FROM employee', function (err, res) {
              if (err) {
                  throw err
              }
              else {
                  console.table(res)
                  console.log('Employee successfully added.')
                  mainmenu()
              }
          })
      })
}
mainmenu()

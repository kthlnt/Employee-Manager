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
  console.log('You are adding a new department.')
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
                  console.log('Department added.')
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
//add role
const addRole = () => {
  console.log('You are adding a new role.')
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'title',
              message: 'Role Title:',
          },
          {
              type: 'input',
              name: 'salary',
              message: 'Salary:',
          },
          {
              type: 'input',
              name: 'dept_id',
              message: 'Department ID:',
          }
      ])

      .then((response) => {
          const newRole = [
              response.title,
              response.salary,
              response.dept_id,
          ]
          
          db.query('INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?)', newRole)

          
          db.query('SELECT * FROM roles', function (err, res) {
              if (err) {
                  throw err
              }
              else {
                  console.table(res)
                  console.log('Role added.')
                  mainmenu()
              }
          })
      })
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
  console.log('You are adding a new employee.')

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
                  console.log('Employee added.')
                  mainmenu()
              }
          })
      })
}
//update employee role
const updateEmployee = () => {

  inquirer
      .prompt([
          {
              type: 'input',
              name: 'employee_id',
              message: 'Enter the ID of the employee whose role you would like to change:'
          },
          {
              type: 'input',
              name: 'role_id',
              message: 'Type the the new Role ID you would like to assign to this employee:'
          }
      ])
      .then((response) => {

          db.query('UPDATE employee SET role_id=? WHERE id=?', [response.role_id, response.employee_id], function (err, res) {
              if (err) {
                  throw err

              } else {
                  console.table(res)
                  viewEmployees()
                  console.log("Role ID updated for employee.")
              }
          })
      })
}
mainmenu()

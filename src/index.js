import inquirer from "inquirer";
import pg from "pg";
import {
  createEmployeeTable,
  viewEmployees,
  updateEmployeeRole,
} from "./models/employees.js";

import { viewRoles } from "./models/roles.js";
import { saveEmployee, saveRole } from "./db.js"; // Import saveEmployee and saveRole functions

const addEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:",
    },
    {
      type: "input",
      name: "role",
      message: "Enter the employee's role:",
    },
    {
      type: "input",
      name: "manager",
      message: "Enter the employee's manager:",
    },
  ]);

  // Save the employee using the saveEmployee function
  await saveEmployee(answers);
  console.log("Employee added successfully!");
};

const addRole = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the role salary:",
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter the department ID:",
    },
  ]);

  // Save the role using the saveRole function
  await saveRole(answers);
  console.log("Role added successfully!");
};

const main = async () => {
  const { Client } = pg;
  const client = new Client();
  await client.connect();

  // Create the employee table
  await createEmployeeTable(client);

  await client.end();

  let shouldContinue = true;

  while (shouldContinue) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "View Employees",
          "Update Employee Role",
          "View Roles",
          "Add Role", // Add this line
          "Quit",
        ],
      },
    ]);

    if (answers.action === "Add Employee") {
      await addEmployee();
    } else if (answers.action === "View Employees") {
      await viewEmployees();
    } else if (answers.action === "Update Employee Role") {
      await updateEmployeeRole();
    } else if (answers.action === "View Roles") {
      await viewRoles();
    } else if (answers.action === "Add Role") {
      // Add this block
      await addRole();
    } else if (answers.action === "Quit") {
      shouldContinue = false;
    }
  }
};

main();

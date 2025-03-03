import inquirer from "inquirer";
import fs from "fs";
import { saveEmployee, getEmployees } from "../db.js";
import { markdownTable } from "markdown-table";

export const updateEmployeeRole = async () => {
  const employees = await getEmployees();
  const employeeNames = employees.map((employee) => {
    return `${employee.first_name} ${employee.last_name}`;
  });

  inquirer
    .prompt([
      {
        type: "list",
        name: "full_name",
        message: "Which employee's role do you want to update?",
        choices: employeeNames,
      },
    ])
    .then(async (answers) => {
      await saveEmployee(answers);
      console.log("Employee added successfully");
      return;
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log(error);
        console.log("Something went wrong");
      }
    });
};
export const viewEmployees = async () => {
  const employees = await getEmployees();
  const data = [];
  const columnNames = [
    "id",
    "first name",
    "last name",
    "role id",
    "manager id",
  ];

  data.push(columnNames);
  employees.map((row) => {
    data.push([
      row.id,
      row.first_name,
      row.last_name,
      row.role_id,
      row.manager_id,
    ]);
  });
  const mdTable = markdownTable(data);
  console.log(mdTable);
};
/*
This function adds an employee to the employees table
in the database.
*/
export const addEmployee = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the employee's role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the employee's manager ID",
      },
    ])
    .then(async (answers) => {
      await saveEmployee(answers);
      console.log("Employee added successfully");
      return;
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log(error);
        console.log("Something went wrong");
      }
    });
};

/*
This function creates a table called employees 
in the database. 

The table has the following columns:
- id(serial primary key)
    - first_name(varchar 30)
    - last_name(varchar 30)
    - role_id(int)
    - manager_id(int)
    */
export const createEmployeeTable = async (client) => {
  const createEmployeeTableQuery = fs
    .readFileSync("./src/sql/create_tables.sql")
    .toString();
  const res = await client.query(createEmployeeTableQuery);
  return res;
};

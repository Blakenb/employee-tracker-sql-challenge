import pg from "pg";

const saveToDb = async (query, data) => {
  const { Client } = pg; // Import Client class from pg package
  const client = new Client(); // Instantiate a new client
  await client.connect(); // Connect to the database

  const res = await client.query(query, data);
  await client.end();
  return res;
};
const queryDb = async (query) => {
  const { Client } = pg; // Import Client class from pg package
  const client = new Client(); // Instantiate a new client
  await client.connect(); // Connect to the database

  const res = await client.query(query);
  await client.end();
  return res.rows;
};

export const saveEmployee = async (employee) => {
  const saveEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
  const data = [
    employee.first_name,
    employee.last_name,
    employee.role_id,
    employee.manager_id,
  ];

  const res = await saveToDb(saveEmployeeQuery, data);
  return res;
};

export const saveRole = async (role) => {
  const saveRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
  const data = [role.title, role.salary, role.department_id];

  const res = await saveToDb(saveRoleQuery, data);
  return res;
};

export const getEmployees = async () => {
  const employees = await queryDb("select * from employees");
  return employees;
};

export const getRoles = async () => {
  const roles = await queryDb("select * from roles");
  return roles;
};

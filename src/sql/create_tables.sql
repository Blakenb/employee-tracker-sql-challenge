-- This script creates the employees table on
-- each run of the application. It will delete
-- all data in the table if it already exists.
-- DROP TABLE IF EXISTS employees;

CREATE TABLE if not exists employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

CREATE TABLE if not exists roles (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) unique not null,
    salary DECIMAL not null, 
    department_id INT not null 
);

CREATE TABLE if not exists department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);
    
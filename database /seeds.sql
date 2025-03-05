-- Insert departments
INSERT INTO department (name)
VALUES ('Graphic Design'),
       ('Video Game Development'),
       ('Full stack Dev'),
       ('Customer service'),
       ('Project Management');

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES ('Graphic Designer', 80000, 1),
       ('Video Game Developer', 80000, 2),
       ('Full stack Dev', 110000, 3),
       ('Customer service', 70000, 4),
       ('Project Manager', 100000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Isabel', 'Loving', 1, null),
       ('Bobby', 'Little', 2, 1),
       ('James', 'Hill', 3, 1),
       ('Billy', 'Bob', 4, 1),
       ('James', 'Brown', 5, null);
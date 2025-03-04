INSERT INTO department (name)
VALUES ('Graphic Design'),
       ('Video Game Development'),
       ('Voice Acting'),
       ('Script Writing'),
       ('Management');


INSERT INTO role (title, salary, department_id)
VALUES ('Graphic Designer', 80000, 1),
       ('Video Game Developer', 80000, 2),
       ('Voice Actor', 60000, 3),
       ('Script Writer', 70000, 4),
       ('Manager', 40000, 5);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('', '', 1, 5),
       ('', '', 2, 5),
       ('', '', 3, 5),
       ('', '', 4, 5),
       ('', '', 5, null);
      
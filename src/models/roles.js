import inquirer from "inquirer";
import fs from "fs";
//TODO: when created import add role from db
import { getRoles } from "../db.js";
import { markdownTable } from "markdown-table";
//TODO: add roll
export const viewRoles = async () => {
  const roles = await getRoles();

  const data = [];
  const columnNames = ["id", "title", "salary", "department"];
  data.push(columnNames);
  roles.map((row) => {
    data.push([row.id, row.title, row.salary, row.department]);
  });
  const mdTable = markdownTable(data);
  console.log(mdTable);
};

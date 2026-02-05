import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "cha_panela"
});

export default db;
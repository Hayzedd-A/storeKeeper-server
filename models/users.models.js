const db_con = require("../config/mysql.config");

const addUserToDB = async user => {
  const { id, name, email, phone, passwordhash, role } = user;
  const query = `INSERT INTO users (id, name, email, password_hash, phone, role) values (?, ?, ?, ?, ?, ?);`;
  const values = [id, name, email, passwordhash, phone, role];
  console.log(values);
  const db_conn = await db_con();
  return await db_conn.execute(query, values);
};

module.exports = { addUserToDB };

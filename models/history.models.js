const db_con = require("../config/mysql.config");

const insertIntoHistory = (data = {}) => {
  const query = `INSERT INTO history (id, product_id, quantity, amount, sale_time, seller_id) VALUES (?, ?, ?, ?, ?, ?);`;
  const db_conn = db_con();

  return db_conn.execute(query, data);
};

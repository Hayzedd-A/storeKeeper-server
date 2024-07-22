const db_con = require("../config/mysql.config");

const getAllProductsFromDB = async () => {
  try {
    const query = `SELECT * FROM products;`;
    const db_conn = await db_con();

    return await db_conn.execute(query);
  } catch (error) {
    console.log(error.message);
  }
};

const getProductsByID = async id => {
  try {
    const query = `SELECT * FROM products WHERE id =?;`;
    const db_conn = await db_con();

    return await db_conn.execute(query, [id]);
  } catch (error) {
    console.log(error.message);
  }
};

const updateProductQuantityByID = async (id, quantity) => {
  try {
    const query = `UPDATE products SET quantity =? WHERE id =?;`;
    const db_conn = await db_con();

    return await db_conn.execute(query, [quantity, id]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllProductsFromDB,
  getProductsByID,
  updateProductQuantityByID,
};

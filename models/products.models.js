const db_con = require("../config/mysql.config");
const { v4: uuidv4 } = require("uuid");
const uniqid = require("uniqid");

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

/*
UPDATE products SET 
  quantity = CASE id 
    WHEN 1 THEN 5 
    WHEN 2 THEN 3 
    WHEN 3 THEN 7 
  END 
WHERE id IN (1, 2, 3); 
*/

const updatePurchasedProducts = async data => {
  try {
    let query = `UPDATE products SET quantity = CASE id `;
    let values = [];
    data.map(({ id, newQuantity }) => {
      query += `WHEN '${id}' THEN ${newQuantity} `;
      values.push(`'${id}'`);
    });
    values = values.join(", ");
    query += `END WHERE id IN (${values}) `;
    // console.log("query: ");
    const db_conn = await db_con();

    return await db_conn.execute(query);
  } catch (error) {
    return [new Error(error.message)];
  }
};

const createPurchaseHistory = async data => {
  try {
    const values = data.items.map(item => {
      return `('${uniqid.time()}','${data.id}','${item.id}',${
        item.purchaseValue
      },${item.amount},'${data.seller_id}')`;
    });
    const query = `
      INSERT INTO history (id, sale_id, product_id, quantity, amount,  seller_id) 
      VALUES ${values}
    `;
    const db_conn = await db_con();
    return await db_conn.execute(query, values);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
  getAllProductsFromDB,
  getProductsByID,
  updateProductQuantityByID,
  updatePurchasedProducts,
  createPurchaseHistory,
};

const mysql = require("mysql2/promise");

const databaseConnection = async () => {
  try {
    return await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  } catch (error) {
    return error;
  }
};

module.exports = databaseConnection;

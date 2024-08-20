require("dotenv").config();
const express = require("express");
const routemap = require("express-routemap");
const cors = require("cors");
const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/user.routes");
const databaseConnection = require("./config/mysql.config");
const uniqid = require("uniqid");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(process.env.DB_USER);
  routemap(app);
  console.log(`Server is running on port ${port}`);
});

const getData = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products?limit=300");
    let { products } = await response.json();

    let query = `INSERT INTO products (id, name, price, quantity, description, image, category) VALUES ?`;
    const db_conn = await databaseConnection();

    let values = products.map(product => {
      let { title, price, stock, description, thumbnail, category } = product;
      return [
        uniqid.time(),
        title,
        price,
        stock,
        description,
        thumbnail,
        category,
      ];
    });

    console.log(values);

    response = await db_conn.query(query, [values]);

    await db_conn.end();

    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
  console.log("code completed");
};

// getData();

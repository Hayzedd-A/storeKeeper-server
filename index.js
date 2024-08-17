require("dotenv").config();
const express = require("express");
const routemap = require("express-routemap");
const cors = require("cors");
const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/user.routes");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  routemap(app);
  console.log(`Server is running on port ${port}`);
});

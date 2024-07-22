const {
  getAllProductsFromDB,
  getProductsByID,
  updateProductQuantityByID,
} = require("../models/products.models");
const { validatePurchases } = require("../validations/products.validations");

const getAllProducts = async (req, res) => {
  try {
    const [db_result] = await getAllProductsFromDB();

    res.status(200).json({
      status: true,
      data: db_result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const purchaseProducts = async (req, res) => {
  try {
    console.log(req.body);
    const { items, total_amount } = req.body;
    // Validate and process each product in the products array here
    let output = items.map(async product => {
      try {
        let { error } = validatePurchases(product);
        if (error) throw new Error(error.details[0].message);

        // Example: Check if product exists, check if quantity is available, update inventory, etc.
        const [dbProduct] = await getProductsByID(product.id);
        if (!dbProduct || !dbProduct.length)
          throw new Error("product with that id does not exist");
        const availableQuantity = dbProduct[0].quantity - product.purchaseValue;
        console.log(availableQuantity, dbProduct, product.purchaseValue);
        if (availableQuantity < 0)
          throw new Error(
            "Insufficient quantity for product with id: " + product.id
          );
        let dbResult = await updateProductQuantityByID(
          product.id,
          availableQuantity
        );
        if (!dbResult || dbResult.affectedRows === 0)
          throw new Error(
            "Failed to update product quantity for product with id: " +
              product.id
          );

        return true;
      } catch (error) {
        return error;
      }

      // Example: Check if product exists, check if quantity is available, update inventory, etc.
    });

    let errors = await Promise.all(output);
    if (errors.some(error => error instanceof Error)) {
      throw new Error(
        errors.filter(error => error instanceof Error).join(", ")
      );
    }

    // Implement purchasing logic here

    res.status(200).json({
      status: true,
      message: "Products purchased successfully",
    });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getAllProducts, purchaseProducts };

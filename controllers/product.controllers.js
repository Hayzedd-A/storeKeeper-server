const {
  getAllProductsFromDB,
  getProductsByID,
  updateProductQuantityByID,
  updatePurchasedProducts,
  createPurchaseHistory,
  getHistoryFromDB,
  updateProductToDB,
} = require("../models/products.models");
const {
  validatePurchases,
  validateProductUpdate,
} = require("../validations/products.validations");
const { v4: uuidv4 } = require("uuid");

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

const purchaseProducts1 = async (req, res) => {
  try {
    const {
      items,
      total_amount,
      seller_id = "c3ed702a-913c-4e3f-81c6-5e2d6afe1f80",
    } = req.body;
    // Validate and process each product in the products array here
    let output = items.map(async product => {
      try {
        let { error } = validatePurchases(product);
        if (error) throw new Error(error.details[0].message);

        // Check if product exists, check if quantity is available, update inventory, etc.
        const [dbProduct] = await getProductsByID(product.id);
        if (!dbProduct || !dbProduct.length)
          throw new Error("product with that id does not exist");

        // Check if there's enough quantity for the purchase
        const availableQuantity = dbProduct[0].quantity - product.purchaseValue;
        if (availableQuantity < 0)
          throw new Error(
            "Insufficient quantity for product with id: " + product.id
          );
        // Update product quantity in the database

        let dbResult = await updateProductQuantityByID(
          product.id,
          availableQuantity
        );
        if (!dbResult || dbResult.affectedRows === 0)
          throw new Error(
            "Failed to update product quantity for product with id: " +
              product.id
          );
        // Create history entry in the database
        const historyData = {
          id: dbProduct[0].id,
          product_id: dbProduct[0].id,
          quantity: product.purchaseValue,
          amount: dbProduct[0].price,
          sale_time: new Date(),
          seller_id: seller_id,
        };
        await insertIntoHistory(historyData);

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

const purchaseProducts = async (req, res) => {
  try {
    const {
      items,
      total_amount,
      seller_id = "63b73cce-d15b-4a81-8379-c9229bdf4ece",
    } = req.body;
    // console.log("items : ", items);
    const validatedProducts = [];
    // Validate each product in the items array
    await Promise.all(
      items.map(async product => {
        // validate with joi
        let { error } = validatePurchases(product);
        if (error) {
          throw new Error(
            `validation, There is an error with product ${product.name} : ${error.details[0].message}`
          );
        }
        // check if product exists
        let [dbProduct] = await getProductsByID(product.id);
        if (!dbProduct || !dbProduct.length) {
          throw new Error(`validation, ${product.name} does not exist`);
        }
        dbProduct = dbProduct[0];
        // check if there's enough quantity for the purchase
        const availableQuantity = dbProduct.quantity - product.purchaseValue;
        if (availableQuantity < 0) {
          throw new Error(
            `validation, Insufficient quantity for product : ${product.name}`
          );
        }
        // create an array of the products having the new quantity
        product.newQuantity = availableQuantity;
        validatedProducts.push(product);
        // console.log("validated: ", validatedProducts);
      })
    );

    // update all products quantity in the database
    const [updateResult] = await updatePurchasedProducts(validatedProducts);
    // console.log("quantity update: ", updateResult);
    // console.log("validated Products: ", validatedProducts);
    if (updateResult.affectedRows === 0 || updateResult instanceof Error) {
      throw new Error("database, Failed to update product quantities");
    }

    // create history entries in the database
    // create the history object
    const historyID = uuidv4();
    const historyData = {
      id: historyID,
      items: validatedProducts,
      seller_id: seller_id,
      sale_date: new Date().toISOString(),
    };
    // insert the history into the database
    const [historyResult] = await createPurchaseHistory(historyData);
    console.log("history update: ", historyResult);
    // console.log(typeof historyResult);
    if (historyResult.affectedRows === 0 || historyResult instanceof Error) {
      throw new Error("Failed to create history entries");
    }

    res.status(200).json({
      status: true,
      message: "Products purchased successfully",
    });
  } catch (err) {
    console.error(err.stack);
    res.status(403).json({
      status: false,
      message: err.message,
    });
  }
};

const getHisotory = async (req, res) => {
  try {
    const seller_id = req.params.id;
    const [historyData] = await getHistoryFromDB(seller_id);

    if (!historyData || !historyData.length) {
      throw new Error("No history found with that id");
    }
    if (historyData instanceof Error) {
      console.log(historyData);
      throw new Error("There was an error fectching data");
    }

    res.status(200).json({
      status: true,
      data: historyData,
    });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error } = validateProductUpdate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [updateResult] = await updateProductToDB(req.body);
    if (updateResult.affectedRows === 0 || updateResult instanceof Error) {
      throw new Error("Failed to update product");
    }
    console.log(updateResult);
    res.status(200).json({
      status: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  purchaseProducts,
  getHisotory,
  updateProduct,
};

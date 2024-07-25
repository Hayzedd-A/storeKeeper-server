const { addUserToDB } = require("../models/users.models");
const { hashPassword } = require("../utils/passwordHasing");
const { validateUser } = require("../validations/user.validation");
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res) => {
  try {
    const { password } = req.body;
    // Validate user data using Joi
    const { error } = validateUser(req.body);
    if (error) throw new Error(error.details[0].message);
    // Hash the password using bcrypt or other secure method
    req.body.passwordhash = hashPassword(password);
    // Generate a unique user ID and add it to the req.body object
    req.body.id = uuidv4();
    // Add user to the database
    const [dbResult] = await addUserToDB(req.body);
    if (!dbResult || dbResult.affectedRows === 0)
      throw new Error("Failed to add user");
    // Return success or error message
    res.status(201).json({
      status: true,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { addUser };

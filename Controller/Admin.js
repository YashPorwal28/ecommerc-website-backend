const customerSchema = require("../Models/customerSchema");
const sellerSchema = require("../Models/sellerSchema");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await customerSchema.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getAllSellers = async (req, res) => {
  try {
    const allSellers = await sellerSchema.find();
    res.status(200).json(allSellers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

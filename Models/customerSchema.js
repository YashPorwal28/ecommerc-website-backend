const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    passwordHash: { type: String, required: true },
    profilePicUrl: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phoneNo: {
      type: String,
      required: true,
      validate: [validator.isMobilePhone, "Invalid Phone Number"],
    },
    role : {
      type : String,
      enum : ['customer'],
      default : "customer"
    },
    // An array of references to the customer's orders.
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

// encrypting password before saving
customerSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("passwordHash")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// customerSchema.path('passwordHash').validate(function (value) {
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
//     return passwordRegex.test(value);
// }, 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character. Minimum length is 8 characters.');

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

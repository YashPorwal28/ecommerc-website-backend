const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const sellerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String },
    companyName: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    passwordHash: { type: String, required: true },
    profilePicUrl: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    phoneNo: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "Invalid Phone Number"],
      },
      role : {
        type : String,
        enum : ['seller'],
        default : "seller"
      },
      
      

    // array of references to seller products
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// encrypting password before saving
sellerSchema.pre("save", async function (next) {
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

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;

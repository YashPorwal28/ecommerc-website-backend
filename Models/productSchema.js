const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0 },
    category: { type: String },
    attributes: {
      color: { type: String },
      size: { type: String },
      material: { type: String },
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    images: [
      {
        url: { type: String, required: true },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
        rating: { type: Number },
        comment: { type: String },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

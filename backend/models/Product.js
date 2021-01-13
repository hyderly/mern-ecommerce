import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add product name"],
  },
  image: {
    type: String,
    default: "no-photo",
  },
  description: {
    type: String,
    required: [true, "Please add description"],
  },
  brand: {
    type: String,
    required: [true, "Please add product brand"],
  },
  category: {
    type: String,
    required: [true, "Please add product category"],
  },
  price: {
    type: Number,
    required: [true, "Please add product price"],
    default: 0,
  },
  countInStock: {
    type: Number,
    required: [true, "Please add product count"],
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
},{
    timestamps: true
});

const Product = mongoose.model("product", productSchema);

export default Product;

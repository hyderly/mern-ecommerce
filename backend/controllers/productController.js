import asyncHandler from "../middlewares/async.js";

// Product Model
import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
// @access public

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Products Not Found");
  }
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error(`Product not found with id ${req.params.id}`);
  }
});

// @desc Delete Product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json("Product Deleted");
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc Create Product
// @route CREATE /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample product",
    price: 0.99,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update Product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    description,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404).send;
    throw new Error("Product Not Found");
  }
});

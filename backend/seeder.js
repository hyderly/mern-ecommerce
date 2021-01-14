import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import users from "./data/users.js";
import products from "./data/products.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const allUsers = await User.create(users);

    const adminUser = allUsers[0]._id;


    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.create(sampleProducts);

    console.log("Data Imported ...");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed ...");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else {
  destroyData();
}

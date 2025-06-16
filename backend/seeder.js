import mongoose from "mongoose";
import dotenv from "dotenv";
import DbConnection from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Review from "./models/reviewModel.js";
import Order from "./models/orderModel.js";
import Users from "./data/users.js";
import products from "./data/products.js";

const initializeEnv = () => {
  dotenv.config();
  DbConnection();
};

const seedData = async () => {
  try {
    initializeEnv();
    await deleteData();

    const createdUsers = await User.insertMany(Users);
    console.log("Users seeded successfully");

    // Assuming the first user is the admin user
    const adminUser = createdUsers[0]._id;

    console.log(adminUser);
    await seedProducts(adminUser);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const seedProducts = async (adminUser) => {
  const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser };
  });
  await Product.insertMany(sampleProducts);
  console.log("Products seeded successfully");
};

const deleteData = async () => {
  initializeEnv();
  await User.deleteMany();
  await Product.deleteMany();
  await Review.deleteMany();
  await Order.deleteMany();
};

// node backend/seeder.js -d
if (process.argv[2] === "-d" || process.argv[2] === "--delete") {
  deleteData()
    .then(() => {
      console.log("Data deleted successfully");
      process.exit();
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
      process.exit(1);
    });
}

// node backend/seeder.js -s
if (process.argv[2] === "-s" || process.argv[2] === "--seed") {
  seedData()
    .then(() => {
      console.log("Data seeded successfully");
      process.exit();
    })
    .catch((error) => {
      console.error("Error seeding data:", error);
      process.exit(1);
    });
}

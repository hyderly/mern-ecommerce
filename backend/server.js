import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

import errorHanlder from "./middlewares/errorHandler.js";

import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();

// body parser
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}



// Routes Middleware
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// ErrorHandler Custom Middleware
// Always put after routes
app.use(errorHanlder);

// __direname only availabe for commonjs so we mimic the __direname my path.resolve()
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Make Front end buil folder "Static" on production environment
if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname, '/fronend/build')))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  app.get("/", (req, res) => {
    res.json("API running ...");
  });
}


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} environment at port ${process.env.PORT}`
  )
);

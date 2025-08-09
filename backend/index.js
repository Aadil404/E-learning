import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js"; //also give extension of file
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js"
import mediaRoutes from "./routes/media.route.js"
import coursePurchaseRoutes from "./routes/coursePurchase.route.js";
import courseProgressRoutes from "./routes/courseProgress.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({}); //so that we can access config from .env file

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

//cors
const corsOptions = {
  origin: "http://localhost:5173", // Specify the frontend origin
  credentials: true, // Allow credentials (cookies, auth headers)
};

app.use(cors(corsOptions));

//default middlewares
app.use(express.json());
app.use(cookieParser());

//apis
app.use("/api/media", mediaRoutes);
app.use("/api/user", userRoutes);     //call userRoutes when user hit /api/user route
app.use("/api/course", courseRoutes);     //call courseRoutes when user hit /api/course route
app.use("/api/purchase", coursePurchaseRoutes); //call coursePurchaseRoutes when user hit /api/purchase route
app.use("/api/progress", courseProgressRoutes); //call courseProgressRoutes when user hit /api/progress route

app.listen(PORT, () => { 
  console.log(`server listen at port ${PORT}`);
});

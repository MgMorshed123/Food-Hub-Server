import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import userRoutes from "./routes/user.route";
import bodyParser from "body-parser";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/restaurant.route";

dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend's origin
  methods: "GET,POST,PUT,DELETE", // Specify allowed methods
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));
//
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});

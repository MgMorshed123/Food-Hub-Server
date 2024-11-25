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
  origin: "https://food-app-yt.onrender.com",
  credentials: true,
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

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import userRoutes from "./routes/user.route";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});

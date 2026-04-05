import "dotenv/config"

import express from 'express'
import cors from 'cors'
import { connectDB } from "./config/db.js";

import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js'
import { errorHandler } from "./middleware/errorHandler.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Finance Backend API is running 🚀",
        version: "1.0.0",
    });
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n Server running on http://localhost:${PORT}`);
});
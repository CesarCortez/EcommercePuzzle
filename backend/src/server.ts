import express from 'express';
import productRoutes from './routes/ProductRoutes';
import userRoutes from './routes/UserRoutes';
import orderRoutes from './routes/OrderRoutes';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from "./config/db";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
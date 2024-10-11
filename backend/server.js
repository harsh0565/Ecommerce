import express  from 'express';
import dotenv  from 'dotenv';
import colors  from 'colors';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors'
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
console.log("object")
app.use(express.json({ limit: '20mb' }));
app.use(morgan("dev"));


// routes

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/category" , categoryRoutes);
app.use("/api/v1/product" , productRoutes);


connectDB();
app.get("/",(req,res)=>{
    res.send({
        msg:"this is the testing phase"
    })
})

app.listen(port ,()=>{
    console.log(`server is running at http://localhost:${port}`.bgCyan.red);
})


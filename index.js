import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authenticateRoute from "./api/routes/authenticate.js"
import usersRoute from "./api/routes/user.js"
import cartRoute from "./api/routes/cart.js"
import productsRoute from "./api/routes/product.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://PavithraChandarS:Pavithra0501@cluster0.hzly1jq.mongodb.net/?retryWrites=true&w=majority');
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error : ", error)
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
});

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/user", usersRoute);
app.use("/api/product", productsRoute);
app.use("/api/authenticate", authenticateRoute)
app.use("/api/cart", cartRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(8080, () => {
    connect()
    console.log("Connected to backend.")
})
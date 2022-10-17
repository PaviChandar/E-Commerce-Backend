import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default:1,
    }
})


export default mongoose.model("Cart", CartSchema)
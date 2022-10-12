import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema)
const Product = mongoose.model("Product",ProductSchema)

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default:1,
    }
})


export default mongoose.model("Cart", CartSchema)
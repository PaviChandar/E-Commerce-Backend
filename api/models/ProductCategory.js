import mongoose from 'mongoose'

const ProductCategorySchema = new mongoose.Schema({
    productCategory : {
        type: String,
        required: true
    }
})

export default mongoose.model("ProductCategory", ProductCategorySchema)
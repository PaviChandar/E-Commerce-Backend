import Product from "../models/Product.js"

class ProductController{
    createProduct = async (req, res, next) => {
        const newProduct = new Product(req.body)
    
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        } catch (err) {
            next(err)
        }
    }
    
     updateProduct = async (req, res, next) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(updatedProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    }
     deleteProduct = async (req, res, next) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted.")
        } catch (err) {
            res.status(500).json(err)
        }
    }
    getProduct = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            if(!product) {
                throw "No product found for the corresponding ID"
            }
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    getProducts = async (req, res, next) => {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            next(err)
        }
    }
}

export default ProductController



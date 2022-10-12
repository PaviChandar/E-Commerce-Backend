import express from "express"
import ProductController from "../controllers/ProductController.js";

const router = express.Router();
const product = new ProductController()

router.post("/", product.createProduct);

router.put("/:id", product.updateProduct)

router.delete("/:id", product.deleteProduct)

router.get("/find/:id", product.getProduct)

router.get("/", product.getProducts)

export default router
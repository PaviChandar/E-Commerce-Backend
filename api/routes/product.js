import express from "express"
import ProductController from "../controllers/ProductController.js";
import { verifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();
const product = new ProductController()

router.post("/", verifyAdmin, product.createProduct);

router.put("/:id", verifyAdmin, product.updateProduct)

router.delete("/:id", verifyAdmin, product.deleteProduct)

router.get("/find/:id", verifyAdmin, product.getProduct)

router.get("/", verifyAdmin, product.getProducts)

export default router
import express from "express";
import CartController from "../controllers/CartController.js"

const router = express.Router()
const cart = new CartController()

router.post("/", cart.addToCart)

router.put("/:id", cart.updateCartQuantity)

router.get("/:id", cart.getSingleCartDetail)

export default router
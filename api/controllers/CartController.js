import Cart from "../models/Cart";
import Product from "../models/Product"

class CartController {

    addToCart = async (req, res, next) => {
        const productId = req.params.productId
        const userId = req.params.userId

        try {
            let cart = await Cart.findOne({ productId: productId, userId: userId }, { $increase: { quantity: 1 } })
            res.status(200).json(cart)

        } catch (err) {
            next(err)
        }
    }

    updateCartQuantity = async (req, res, next) => {
        const userId = req.params.userId
        const productId = req.params.productId
        const cart = await Cart.findOne({ productId: productId, userId: userId })

        try {
            if (cart.quantity < 1) {
                throw "Unable to reduce quantity"
            }
            await Cart.updateOne({ productId: productId, userId: userId }, { $inc: { quantity: -1 } })
        } catch (err) {
            next(err)
        }

    }

    removeFromCart = async (req, res, next) => {
        const userId = req.params.userId
        const productId = req.params.productId

        try {
            await Product.findByIdandDelete(userId, productId, { $pull: { cart: req.params.id } })
            res.status(200).json("Product has been removed from cart")
        } catch (err) {
            next(err)
        }
    }

    getCartDetail = async (req, res, next) => {
        try {
            const cart = await Cart.find()
            if (cart.length <= 0) {
                throw "Cart is empty!"
            }
            res.status(200).json(cart)
        } catch (err) {
            next(err)
        }
    }

    getSingleCartDetail = async (req, res, next) => {
        const userId = req.params.userId

        try {
            const singleUserCart = await Cart.find({ userId: userId }).populate({ path: 'productId' })
            res.status(200).json(singleUserCart)
        } catch (err) {
            next(err)
        }

    }

}

export default CartController
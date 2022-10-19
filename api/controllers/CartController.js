import Cart from "../models/Cart.js";

class CartController {

    addToCart = async (req, res, next) => {
        const { productId, userId, quantity } = req.body

        try {
            let cart = await Cart({ productId, userId, quantity }).save()
            res.status(200).json(cart)

        } catch (err) {
            next(err)
        }
    }

    updateCartQuantity = async (req, res, next) => {

        const userId = req.params.id
        const { productId, quantity } = req.body
        const cart = await Cart.findOne({ productId: productId, userId: userId })

        try {
            if (cart.quantity < 1) {
                throw "Unable to reduce quantity"
            }
            await Cart.updateOne({ quantity : quantity})
            res.status(200).json({ message: "Quantity updated!" })
        } catch (err) {
            next(err)
        }

    }

    removeFromCart = async (req, res, next) => {
        let cartId = req.params.id

        try {
            await Cart.findByIdAndDelete(cartId)
            
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
        const userId = req.params.id

        try {
            const singleUserCart = await Cart.find({ userId: userId }).populate({ path: 'productId' })
            res.status(200).json(singleUserCart)
        } catch (err) {
            next(err)
        }

    }

}

export default CartController
import express from "express"
import UserController from "../controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();
const user = new UserController()

router.get('/checkauthentication', verifyToken, (req,res,next) => {
    res.send("hello user, you are logged in")
})

router.get('/checkuser/:id', verifyUser, (req,res,next) => {
    res.send("hello user, you are logged in and can delete")
})

router.get('/checkadmin/:id', verifyAdmin, (req,res,next) => {
    res.send("hello admin, you are logged in and can delete all account")
})

router.put("/:id",  user.updateUser)

router.delete("/:id", user.deleteUser)

router.get("/:id", user.getUser)

router.get("/", user.getUsers)

export default router
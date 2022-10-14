import express from "express"
import UserController from "../controllers/UserController.js";
import { verifyAdmin, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();
const user = new UserController()

router.put("/:id", verifyUser, user.updateUser)

router.delete("/:id", verifyUser, user.deleteUser)

router.get("/:id", verifyUser, user.getUser)

router.get("/",  verifyAdmin, user.getUsers)

export default router
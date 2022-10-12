import express from "express"
import UserController from "../controllers/UserController.js";

const router = express.Router();
const user = new UserController()

router.put("/:id",  user.updateUser)

router.delete("/:id", user.deleteUser)

router.get("/:id", user.getUser)

router.get("/", user.getUsers)

export default router
import express from "express";
import AuthenticateController from "../controllers/AuthenticateController.js";

const router = express.Router()
const authenticate = new AuthenticateController()

router.post('/login', authenticate.login)
router.post('/register', authenticate.register)

export default router
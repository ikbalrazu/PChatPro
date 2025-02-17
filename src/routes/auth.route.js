import express from "express";
import { checkAuth, ForgotPassword, Login, Logout, Signup, updateProfileInfo, updateProfilePic, VerifyJWTToken } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.post("/forgot-password",ForgotPassword);
router.post("/verify-jwt-token", VerifyJWTToken);

router.put("/update-profile", protectRoute, updateProfilePic);
router.put("/update-profileinfo",protectRoute, updateProfileInfo);

router.get("/check", protectRoute, checkAuth);

export default router;
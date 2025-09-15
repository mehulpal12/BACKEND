import { Router } from "express";
import { registerUser, loginUser,logoutUser,refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import  upload  from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar" },
    { name: "coverImage"},
  ]),
  registerUser
);



router.route('/login').post(loginUser);

// secure route
router.route("/logout").post( verifyJwt,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;

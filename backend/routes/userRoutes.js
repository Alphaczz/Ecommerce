import express from "express";
import {signupUser,loginUser,getUserProfile,logoutUser,followUnFollowUser,updateUser} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser); // Update user profile
router.get('/profile/:query',getUserProfile);

export default router;









//login
//update
//follow user
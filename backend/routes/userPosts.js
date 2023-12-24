import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createPost,getPost,getUserPost,deletePost,getFeed,replyToPost,likeUnlikePost} from "../controllers/postContreollers.js";

const router = express.Router();

router.get('/feed',protectRoute,getFeed);
router.post('/create',protectRoute,createPost);
router.get('/:id',getPost);
router.get('/user/:username',getUserPost);

router.delete('/:id',protectRoute,deletePost);
router.put('/like/:id',protectRoute,likeUnlikePost);
router.put('/reply/:id',protectRoute,replyToPost);


export default router;
import express from "express"; 
import { AcceptRequest, FriendRequest, MyFriends, RejectRequest, SearchFriends, Unfriend, CancelRequest } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/friend-request", protectRoute, FriendRequest);
router.post("/accept-request", protectRoute, AcceptRequest);
router.post("/reject-request", protectRoute, RejectRequest);
router.post("/unfriend",Unfriend);
router.post("/cancel-request",protectRoute, CancelRequest);
router.get("/my-friends",protectRoute, MyFriends);
router.get("/search-friends",protectRoute, SearchFriends);

export default router;
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { sendNotification } from "../utils/socket.js";

export const FriendRequest = async(req,res) => {
    const {receiverId} = req.body;
    const loggedInUserId = req.user._id;

    if (!receiverId || !loggedInUserId) {
      return res.status(400).json({ message: "Both sender and receiver IDs are required." });
    }

    try {
      // Use atomic updates with $addToSet to prevent duplicates
      const [receiverUpdate, senderUpdate] = await Promise.all([
        User.updateOne(
          { _id: receiverId },
          { $addToSet: { friendRequests: loggedInUserId } }
        ),
        User.updateOne(
          { _id: loggedInUserId },
          { $addToSet: { sendRequests: receiverId } }
        ),
      ]);

      if (receiverUpdate.modifiedCount === 0 || senderUpdate.modifiedCount === 0) {
        return res.status(400).json({ message: "Friend request already sent or an error occurred." });
      }

      // Notify sender in real time
      // sendNotification(senderId, {
      //   type: "friend-request-accepted",
      //   message: `${requestId} accepted your friend request.`,
      // });
      
      res.status(200).json({ 
        message: "Friend request sent successfully."
      });

    } catch (error) {
      console.error("Error in FriendRequest:", error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
}

export const SendRequest = async(req,res)=>{
  const {receiverId} = req.body;
}

export const AcceptRequest = async(req,res) => {
    const { userId } = req.body;
    const requestId = req.user._id;

    // Notify sender in real time
    // sendNotification(senderId, {
    //   type: "friend-request-accepted",
    //   message: `${requestId} accepted your friend request.`,
    // });

    // Validate input
    if (!userId || !requestId) {
      return res.status(400).json({ message: "Both userId and requestId are required." });
    }

    // Update both users in parallel
    const [userUpdate, friendUpdate] = await Promise.all([
      User.updateOne(
        { _id: userId }, 
        { 
        $pull: { sendRequests: requestId }, 
        $addToSet: { friends: requestId } 
        }
      ),
      User.updateOne(
        { _id: requestId }, 
        { 
          $pull: { friendRequests: userId }, 
          $addToSet: { friends: userId } 
        }
      ),
    ]);

    // Check if the request existed
    if (!userUpdate.modifiedCount && !friendUpdate.modifiedCount) {
      return res.status(400).json({ message: "No pending friend request found to cancel." });
    }

    res.status(200).json({ message: "Friend request accepted successfully." });
}

export const RejectRequest = async(req,res)=>{
    const { userId } = req.body;
    const requestId = req.user._id;

    // Validate input
    if (!userId || !requestId) {
      return res.status(400).json({ message: "Both userId and requestId are required." });
    }

    try {
      // Update both users in parallel
      const [userUpdate, friendUpdate] = await Promise.all([
        User.updateOne({ _id: userId }, { $pull: { sendRequests: requestId } }),
        User.updateOne({ _id: requestId }, { $pull: { friendRequests: userId } }),
      ]);

      // Check if updates affected documents
      if (!userUpdate.modifiedCount || !friendUpdate.modifiedCount) {
        return res.status(400).json({ message: "No pending request found to cancel." });
      }
      res.status(200).json({ message: "Friend request rejected successfully." });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    

}

export const Unfriend = async(req,res)=>{
    const { userId, friendId } = req.body;

    // Validate input
    if (!userId || !friendId) {
      return res.status(400).json({ message: "Both userId and friendId are required." });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    // Check if they are friends
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are not friends with this user." });
    }

    // Remove each other from friends lists
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "User unfriended successfully." });
}

export const CancelRequest = async(req,res)=>{
  const {friendId } = req.body;
  const userId = req.user._id;
  try {

    // Validate input
    if (!userId || !friendId) {
      return res.status(400).json({ message: "Both userId and friendId are required." });
    }

    // Update both users in parallel
    const [userUpdate, friendUpdate] = await Promise.all([
      User.updateOne({ _id: userId }, { $pull: { sendRequests: friendId } }),
      User.updateOne({ _id: friendId }, { $pull: { friendRequests: userId } }),
    ]);

    // Check if updates affected documents
    if (!userUpdate.modifiedCount || !friendUpdate.modifiedCount) {
      return res.status(400).json({ message: "No pending request found to cancel." });
    }
  
    res.status(200).json({ message: "Cancel Request successfully." });
    
  } catch (error) {
    console.error("Error cancelling friend request:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
  

}

export const MyFriends = async(req,res)=>{
  try {
    const users = await User.find({ _id: { $in: req.user.friends } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const SearchFriends = async(req, res) => {
  const {query} = req.query || "";
  const userId = req.user._id;
  try {
    const currentUser = await User.findById(userId).select('friends friendRequests sendRequests');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const friendsList = currentUser.friends;
    
    const users = await User.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
              ]
            },
            // { _id: { $nin: friendsList } },
            // { _id: { $in: currentUser.friendRequests } },
            { _id: { $ne: userId } }
          ]
        }
      },
      {
        $addFields: {
          friendRequests: {
            $cond: [
              { $in: ["$_id", currentUser.friendRequests] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
          sendRequests: {
            $cond: [
              { $in: ["$_id", currentUser.sendRequests] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
          friends: {
            $cond: [
              { $in: ["$_id", currentUser.friends] }, // Check if the user is in the `friendRequests` list
              true,
              false            
            ]
          },
        }
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          friendRequests: 1,
          sendRequests: 1,
          friends: 1,
          profilePic: 1
        }
      }
    ]);
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
}

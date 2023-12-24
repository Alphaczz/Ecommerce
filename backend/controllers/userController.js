import mongoose from "mongoose";
import generateTokenAndSetCookie from "../helpers/generateTokenAnsSetCookie.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";
import Post from "../models/postModel.js";

const signupUser=async(req,res)=>{
       try {
           const {name,email,username,password}=req.body;
           const user=await User.findOne({$or:[{email},{username}]});

           if(user)
           {
              return res.status(400).json({message:"user already exist"});
           }
           const salt =await bcrypt.genSalt(10);
           const hashPassword=await bcrypt.hash(password,salt);
            const newUser= new User({
              name,
              email,
              username,
              password:hashPassword,
            });
             await newUser.save();
            if(newUser)
            {
              generateTokenAndSetCookie(
                     newUser._id,res
              );
              res.status(201).json({
                     id:newUser._id,
                     name:newUser.name,
                     email:newUser.email,
                     username:newUser.username
              });
            }
            else{
                res.status(400).json({message:"Invalid data"});
            }
       } catch (error) {
          res.status(500).json({message:error.message})
          console.log("ERROR in signup :",error.message)
       }
};
const loginUser=async(req,res)=> {
  try {
       const {username,password}=req.body;
       const user =await User.findOne({username});
       const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
       if(!user|| !isPasswordCorrect)return res.status(400).json({
              message:"Invalid Username and password"
       });
      generateTokenAndSetCookie(user._id,res);
      res.status(200).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         username:user.username,
      });
  } catch (error) {
       console.error("Error during login:", error);
       res.status(500).json({
         message: "Some error occurred: " + error.message,
       });
     }
};
const logoutUser=(req,res)=> {
       try {
           res.cookie("jwt","",{maxAge:1});
           res.status(200).json({
              message:"User Logged Out Successfully"
           });   
       } catch (error) {
              res.status(500).json({
                     message:"Some error occured :"+error.message
                })
       }
};
const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};
	
const updateUser = async (req, res) => {
       try {
          const {name,username,email,bio,password}=req.body;
          let {profilePic}=req.body;
          const userId=req.user._id;
          const user = await User.findById(userId);
          if(!user)
          {
               return res.status(400).json({message:"User not found"});
          }
          if(password){
              const salt=await bcrypt.genSalt(10);
              const hashPassword=await bcrypt.hash(password,salt);
              user.password=hashPassword;
          }
          if(profilePic){
            if(user.profilePic){
               await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            user.profilePic = uploadedResponse.secure_url;
          }
         user.name=name||user.name;
         user.username=username||user.username;
         user.email=email||user.email;
         user.profilePic=profilePic||user.profilePic;
         user.bio=bio||user.bio;
         await user.save();

         await Post.updateMany({"replies.userId":userId},
                                {
                                     $set:{
                                       "replies.$.username":user.username,
                                       "replies.$.userProfilePic":user.profilePic,
                                     }
                                },
                                {arrayFilters:[{"replies.userId":userId}]})
         res.status(200).json({
            _message:"User updated successfully",       
         });
       } catch (error) {
          res.status(500).json("UpdateUser:"+ error.message)    
       }
};

const getUserProfile= async(req,res)=>{
     const {query}=req.params;

     try {
      let user ;
      if (mongoose.Types.ObjectId.isValid(query)) {
         user=await User.findById({_id:query}).select("-password").select("-updatedAt");
      }
      else{
          user=await User.findOne({username:query}).select("-password").select("-updatedAt");
      }
      if(!user)
       {
          return res.status(400).json({message:"User not found"});
       };
       res.status(200).json(user);     

     } catch (error) {
              res.status(500).json({message:"getUserProfile:"+error.message})
     }
};






   
export {signupUser,loginUser,logoutUser,	followUnFollowUser,updateUser,getUserProfile
}
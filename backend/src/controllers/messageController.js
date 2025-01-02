import cloudinary from "../lib/cloudinary";
import Message from "../models/messageModel";
import User from "../models/userModel";


export const getUsersForSidebar = async ( req,res ) => {
      try{
          const loggedInUserId = req.user._id;
          //find all user except logged in user
          const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
          
           res.status(200).json(filteredUsers)
      }catch(error){
            console.error("Error in getUsersForSidebar: ",error.message);
            res.status(500).json({ error:"Internal Server Error"});
      }
};

export const getMessages = async (req,res) => {
    try{
        const { id:userToChatId } = req.params 
        const myId = req.user._id; //myId = senderId

        const messages = await Message.find({
          $or:[
            {senderId:myId , receriverId:userToChatId},
            {senderId:userToChatId , receriverId:myId}
          ]
        })

        res.status(200).json(messages)
        
    }catch(error){
          console.log("Error in getMessages controller: ",error.message);
          res.status(500).json({ error : "Internal server Error "});
    }
}

export const sendMessage = async (req,res) => {
    try{
      const {text , image } = req.body;
      const {id:receriverId}= req.params;
      const senderId =  req.user._id;

      let imageUrl;

      if(image){
        //upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receriverId,
        text,
        image: imageUrl,
      });

      await newMessage.save(); // saving to db

      // todo : realtime fucntionlaity => socket.io
      
      res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }

};
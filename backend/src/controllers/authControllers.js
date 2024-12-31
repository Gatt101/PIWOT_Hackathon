import bcrypt from "bcryptjs";
import User from "../models/userModel";


export const signup = async (req,res)=>{
   
  const [fullName,email,password] = req.body;
  try{
      //hashing the pass
      if(password.length<6){
        return res.status(400).json({message:"Password must be atleast 6 Characters"})
      }

      const user = await User.findOne({email})
      if(user) return res.status(400).json({message:"EMail is already exists"});

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      const newUser = new User ({
        fullName,
        email,
        password:hashedPassword
      })

      if(newUser){
          //generating  JWT token
          
      }else{
        res.status(400).json({ message:"Invalid user data"});
      }

   }catch(error){

   }
}

export const login = (req,res)=>{
  res.send('login route');
}

export const logout = (req,res)=>{
  res.send('logout route');
}
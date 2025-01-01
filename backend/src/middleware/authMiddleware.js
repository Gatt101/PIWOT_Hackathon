
export const protectRoute = async (req ,res , next)=>{
  try{
      const token = req.cookies.jwt;

      if(!token){
        return res.status(401).json({ message:"Unauthorized - NO Token Provided"})
      }

      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      if(!decoded){
        return res.status(401).json({message:"Unauthorized - Invalid TOken"})
      }
      
  }catch(error){
    
  }
}
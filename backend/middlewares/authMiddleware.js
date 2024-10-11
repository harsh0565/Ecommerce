import JWT  from 'jsonwebtoken';
import userModel from '../models/userModel.js';
export const requiredSignIn= async(req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
       console.log(error); 
    }
}

export const isAdmin =async(req,res,next)=>{
try {
    const user = await userModel.findById(req.user._id);
    if(user.role!==1){
        return res.send({
            success:false,
            message:"Unauthorize access"
        });
    }
    next();
} catch (error) {
    console.log(error);
}
}
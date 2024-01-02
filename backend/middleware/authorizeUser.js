import { verifyTokenandGetUserId } from "../config/jwt_config"
export const authorizeUser=(req,res,next)=>{

    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        throw new Error(" Unauthorized User")
    }

    try {
        const userId=verifyTokenandGetUserId(token)
        req.userId=userId
        next()
    } catch (error) {
        console.Error(error)
    }
}
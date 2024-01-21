import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
export const jwtToken=(userId)=>{
    const payload={
        userId:userId
    }
    return jwt.sign(payload,process.env.jwt_key,{
        expiresIn:'1 day'
    })
}

export const verifyTokenandGetUserId=(token)=>{
    const payload = jwt.verify(token,process.env.jwt_key)
    console.log(payload.userId)
    return payload.userId
}
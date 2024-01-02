import jwt from 'jsonwebtoken';


export const jwtToken=(userId)=>{
    return jwt.sign({
        userId,
    },process.env.jwt_key,{
        expiresIn:'1 day'
    })
}

export const verifyTokenandGetUserId=(token)=>{
    const payload = jwt.verify(token,process.env.jwt_key)
    return payload.userId
}
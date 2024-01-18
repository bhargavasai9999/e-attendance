import { database } from "../../config/dbconnection.cjs";
import { jwtToken } from "../../config/jwt_config.js";

//Login Controller
export const Login=async (req,res)=>{
    const {email,password}=req.body
    try {
        const query=`SELECT * from e_attendance.User WHERE email=$1`
        const Result =await database.query(query,[email])
        if(Result.rows.length>0){
            if(Result.rows[0].password===password){
                const userIdToken=jwtToken(Result.rows[0].adminid)
                return res.status(200).json({
                    token:userIdToken,
                    name:Result.rows[0]?.name,
                    message:"Login Successful"
                })
            }
            else{
                return res.status(400).json({message:"Incorrect Password"})
            }
        }
        else{
            return res.status(404).json({message:"User not Found"})
        }
    } catch (error) {
        console.log("Authentication Internel Server error:",error)
        return res.status(400).json({message:"Unable to connect server"})
    }
}



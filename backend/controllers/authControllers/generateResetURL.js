import { database } from "../../config/dbconnection.cjs";
import * as crypto from "crypto"
import {sendResetEmail} from '../../config/nodemailer_config.js';
// Reset Password Controller
const generateToken=()=>{
    return crypto.randomBytes(32).toString('hex')
}

export const generateResetURL= async (req,res)=>{
    const {email,hostName}=req.body
    try {
        const verifyResult =await database.query(`SELECT email from e_attendance.User WHERE email=$1`,[email])
        
        if(verifyResult.rows.length>0){
        const resetToken=generateToken()
        const query=`UPDATE e_attendance.User SET reset_token=$1,expiry_time=CURRENT_TIMESTAMP+'1800 Seconds' WHERE email=$2`
        await database.query(query,[resetToken,email])
        sendResetEmail(email,resetToken,hostName)
        return res.status(200).json({message:"reset link is sent to mail"})
        }
        else{
            return res.status(400).json({message:"Email is not Found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Unable to connect server"})
    }

}


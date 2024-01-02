import { database } from "../../config/dbconnection.cjs";
import * as crypto from "crypto"
import {sendEmail} from '../../config/nodemailer_config.js';
// Reset Password Controller
const generateToken=()=>{
    return crypto.randomBytes(32).toString('hex')
}

export const generateResetURL= async (req,res)=>{
    const {email}=req.body
    try {
        const verifyResult =await database.query(`SELECT email from e_attendance.User WHERE email=$1`,[email])
        
        if(verifyResult.rows.length>0){
        const resetToken=generateToken()
        const query=`UPDATE e_attendance.User SET reset_token=$1,expiry_time=CURRENT_TIMESTAMP+'1800 Seconds' WHERE email=$2`
        await database.query(query,[resetToken,email])
        sendEmail(email)
        return res.status(200).json({message:"reset link is sent to mail"})
        }
        else{
            const errorMessage="Entered Email is not Found"
            return res.status(400).json({message:errorMessage})
        }
    } catch (error) {
        console.log(error);
    }

}


import { database } from "../../config/dbconnection.cjs";
import { generateRandomToken } from "../../utils/generateToken.js";

export const AttendanceToken=async (req,res)=>{
    
    const userId=req.userId
    try{
        const token = generateRandomToken()
        const query=  `UPDATE e_attendance.User SET attendance_token=$1, attendancetoken_expirytime=CURRENT_TIMESTAMP+'300 Seconds' WHERE adminid=$2`
        await database.query(query,[token,userId])
        console.log("attendance token updated, expires in 5 minutes")
        return res.status(500).json({message:"Refreshes for every 5 minutes"})

    }
    catch(error){
        console.log(error)
        
    }
}
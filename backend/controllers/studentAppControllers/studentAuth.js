import { database } from "../../config/dbconnection.cjs";
import { jwtToken } from "../../config/jwt_config.js";
import { sendEmail } from "../../utils/sendMail.js";

export const studentLogin=async(req,res)=>{
    const {rollNumber,password}=req.body;
    try {
        const query=`SELECT studentid,password from e_attendance.Student 
        WHERE roll_number=$1`
        const Result=await database.query(query,[rollNumber])
        if(Result.rows.length>0){

            if(Result.rows[0].password===password){
                const userIdToken=jwtToken(Result.rows[0].studentid)
                return res.status(200).json({
                    message:"Credentials validated  **successfully",
                    token:userIdToken
                })
            }
            else{
                return res.status(400).json({message:"Incorrect Password"})
            }
        }
        else{
            return res.status(404).json({message:"student not found,contact your administrator"})
        }
        
    } catch (error) {
        console.log(error)
    }

}

export const studentResetPassword=async (req,res)=>{
    const {token,new_Password}=req.body
    try{
        const query= `UPDATE e_attendance.Student SET password=$1 WHERE reset_token=$2 AND CURRENT_TIMESTAMP < resettoken_expirytime`
        const Result=await database.query(query,[new_Password,token])
        if(Result.rowCount===0){
            return res.status(404).json({message:"Invalid URL or Expired"})
        }
        await database.query(`UPDATE e_attendance.Student SET reset_token=$1,resettoken_expirytime=$2 WHERE reset_token=$3` ,[null,null,token])
        return res.status(200).json({message:"Password Updated Successfully"})
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:"Internal Server error"})
        }
    
}

export const generateResetURL=async (req,res)=>{
    const{rollNumber,hostName}=req.body;
    try {
        const verifyResult =await database.query(`SELECT email from e_attendance.Student WHERE roll_number=$1`,[rollNumber])
        const email=verifyResult.rows[0]?.email
        if(verifyResult.rows.length>0){
        const resetToken=generateRandomToken()
        const query=`UPDATE e_attendance.Student SET reset_token=$1,resettoken_expirytime=CURRENT_TIMESTAMP+'1800 Seconds' WHERE roll_number=$2`
        await database.query(query,[resetToken,rollNumber])


        const resetURL=`http://${hostName}/student/updatepassword/${resetToken}`
        const data={
            subject: "Password Change Request link from E-attendance", // Subject 
            text: "Password reset link", // text body
            html: `<h3>Reset Your Password </h3>
            <h4>Here is Your password reset link </h4>
            <strong>Expires In : </strong>30 Minutes
            <a  rel="noreferrer noopener" href="${resetURL}"target="_blank">click Here</a>
            <h4>Thank you...</h4>
            <strong>E-attendance Team</strong>`,
        }
        sendEmail(email,data)
        return res.status(200).json({message:"reset link is sent to Registered Email"})

        }
        else{
            return res.status(400).json({message:"Email is not Found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Unable to connect server"})
    }

}

export const getProfile=async(req,res)=>{
    try {
        const result =await database.query(`SELECT name,email,mobile_number from e_attendance.Student WHERE studentid=$1`,[req.userId])
        const attendancePercentage=await database.query(`SELECT 
        student_id,
        COUNT(CASE WHEN attendance_status = 'Present' THEN 1 END) AS total_present,
        COUNT(*) AS total_records,
        ROUND((COUNT(CASE WHEN attendance_status = 'Present' THEN 1 END) * 100.0) / COUNT(*), 2) AS attendance_percentage
    FROM e_attendance.Attendance
    WHERE student_id = $1
    GROUP BY student_id;
    
    `,[req.userId])
console.log(result,attendancePercentage)
    if(result.rowCount>0){
        return res.status(200).json({
            profile:result.rows[0],
            percentage:attendancePercentage.rows[0].attendance_percentage
    })
    
    }
    else{
        return res.status(400).json({message:"details not found"})
    }
    } catch (error) {
        console.log(error)
         return res.status(500).json({message:"error fetching profile"})
    }

}
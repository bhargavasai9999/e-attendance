import { database } from "../../config/dbconnection.cjs";
import { generateRandomToken } from "../../utils/generateToken.js";

export const AttendanceToken=async (req,res)=>{
    
    const userId=req.userId
    try{
        console.log(userId);
        const token = generateRandomToken()
        const query=  `UPDATE e_attendance.User SET attendance_token=$1, attendancetoken_expirytime=CURRENT_TIMESTAMP+'3000 Seconds' WHERE adminid=$2`
        await database.query(query,[token,userId])
        await database.query(`WITH new_records AS (
            SELECT s.studentid, $1::uuid AS admin_id
            FROM e_attendance.Student AS s
            WHERE s.associated_adminid = $1
          )
          INSERT INTO e_attendance.Attendance (student_id, admin_id, created_at, attendance_status)
          SELECT nr.studentid, nr.admin_id, CURRENT_DATE, 'Absent'
          FROM new_records nr
          WHERE NOT EXISTS (
            SELECT 1
            FROM e_attendance.Attendance AS a
            WHERE a.student_id = nr.studentid
              AND a.created_at = CURRENT_DATE
          );
          
        
        `,[userId])
        console.log("attendance token updated, expires in 5 minutes")
        return res.status(200).json({message:"Refreshes for every 5 minutes",AttendanceToken:token})

    }
    catch(error){
        console.log(error)
        
    }
}
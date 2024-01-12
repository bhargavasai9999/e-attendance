import { database } from "../../config/dbconnection.cjs";

export const markAttendance=async (req,res)=>{
    const {newStatus,token}=req.body
    try {
        const query=`UPDATE e_attendance.Attendance AS a
        SET attendance_status = $1
        FROM e_attendance.Student AS s
        WHERE a.student_id = s.student_id
          AND s.student_id = $2
          AND a.attendance_token = $3
          AND s.associated_adminid = a.admin_id` 
        await database.query(query,[newStatus,req.userId,token])
        console.log("attendance marked")
    } catch (error) {
        
    }

}
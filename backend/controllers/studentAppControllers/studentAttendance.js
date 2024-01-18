import { database } from "../../config/dbconnection.cjs";

export const markAttendance=async (req,res)=>{
    const {newStatus,token}=req.body
    try {
        const query=`
        UPDATE e_attendance.Attendance AS a
SET
  checkin_time = COALESCE(a.checkin_time, CURRENT_TIMESTAMP),
  checkout_time = COALESCE(a.checkout_time, CURRENT_TIMESTAMP),
  attendance_status = CASE 
                        WHEN a.checkin_time IS NOT NULL AND a.checkout_time IS NOT NULL THEN 'Present'
                        ELSE a.attendance_status
                      END
FROM e_attendance."user" AS u
JOIN e_attendance.Student AS s ON u.ADMINID = s.associated_adminid
WHERE a.student_id = $1
  AND u.attendance_token = $2
  AND u.attendancetoken_expirytime > CURRENT_TIMESTAMP
  AND a.created_at = CURRENT_DATE 
RETURNING a.checkin_time, a.checkout_time, a.attendance_status;

        `
        await database.query(query,[req.userId,token])
        console.log("attendance marked")
        return res.json({message:"marked your details"})
    } catch (error) {
        console.log(error)
        return res.json({message:"internal error"})
    }

}
import { database } from "../../config/dbconnection.cjs";

export const markAttendance=async (req,res)=>{
    const {token}=req.body
    try {
        const query=`
        UPDATE e_attendance.Attendance AS a
        SET
          checkin_time = COALESCE(a.checkin_time, CURRENT_TIMESTAMP),
          checkout_time = CASE 
                            WHEN a.checkin_time IS NOT NULL AND a.checkout_time IS NULL THEN CURRENT_TIMESTAMP
                            ELSE COALESCE(a.checkout_time, a.checkout_time)  -- Keep the current value of checkout_time if already set
                          END,
          attendance_status = COALESCE(a.attendance_status, 
                                       CASE WHEN a.checkout_time IS NOT NULL THEN 'Present' END)  -- Set to 'Present' if checkout_time is set
        FROM e_attendance."user" AS u
        JOIN e_attendance.Student AS s ON u.ADMINID = s.associated_adminid
        WHERE a.student_id = $1
          AND u.attendance_token = $2
          AND u.attendancetoken_expirytime > CURRENT_TIMESTAMP
          AND a.created_at = CURRENT_DATE 
        RETURNING a.checkin_time, a.checkout_time, a.attendance_status;
        
        `
        await database.query(query,[req.userId,token])
        await database.query(`CALL updateAttendanceStatus()`)
        console.log("attendance marked")
        return res.status(200).json({message:"marked your details *successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal error"})
    }

}

export const getAllAttendance = async (req, res) => {
  try {
      const query = `
          SELECT 
              checkin_time,
              checkout_time,
              attendance_status,
              created_At
          FROM e_attendance.Attendance WHERE student_id=$1 ORDER BY created_At DESC
      `
      const result = await database.query(query,[req.userId]);
      console.log(result.rows)
      return res.status(200).json(result.rows);
  } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
  }
};

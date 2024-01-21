import e from "express";
import { database } from "../../config/dbconnection.cjs";


export const modifyAttendanceStatus=async (req,res)=>{
    const {status,attendance_id}=req.body;
    console.log(status,attendance_id)
    try {
        const query=`UPDATE e_attendance.Attendance
        SET checkin_time=$2,checkout_time=$3,attendance_status = $1
        WHERE attendance_id = $4
          AND admin_id = $5
        `
        const Result=await database.query(query,[status,null,null,attendance_id,req.userId])
        console.log(Result)
        if(Result.rowCount>0){
            return res.status(200).json({message:"Record updated successfully"})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error, not updated"})
    }
}

export const getAttendanceStatus = async (req, res) => {
    const userId = req.userId;
    try {
        const attendanceQuery = `
            SELECT s.studentid, s.roll_number, s.name, 
                   a.checkin_time, a.checkout_time, a.attendance_status
            FROM e_attendance.Student AS s
            LEFT JOIN e_attendance.Attendance AS a ON s.studentid = a.student_id
            LEFT JOIN e_attendance.User AS u ON s.associated_adminid = u.ADMINID
            WHERE u.ADMINID = $1
                AND a.created_at = CURRENT_DATE;
        `;

        const attendanceResult = await database.query(attendanceQuery, [userId]);

        if (attendanceResult.rows.length > 0) {
            return res.status(200).json(attendanceResult.rows);
        } else {
            return res.status(200).json({ message: "No attendance for today" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const  getAttendance=async (req,res)=>{
    const {rollNumber,date}=req.body

try {
            const Result=await database.query(`
            SELECT
  s.studentid,
  s.roll_number,
  s.name,
  a.checkin_time,
  a.checkout_time,
  a.attendance_status,
  a.attendance_id,
  a.created_at
FROM e_attendance.Student AS s
LEFT JOIN e_attendance.Attendance AS a ON s.studentid = a.student_id
WHERE
  (s.roll_number = $1 OR $1 IS NULL)
  AND (a.created_at::date = $2::date OR $2 IS NULL)
  AND (s.associated_adminid = $3 );
`,[rollNumber,date,req.userId])
console.log(Result)
if(Result.rowCount>0){
    console.log(Result.rows)
        return res.status(200).json(Result.rows)
}
else{
    return res.status(400).json({message:"No records found on selected date or roll number"})
}
} catch (error) {
    console.log(error)
    return res.status(400).json({message:"No Records found at Selected Date or Roll Number"})
}
}
import { database } from "../../config/dbconnection.cjs";


export const modifyAttendanceStatus=async (req,res)=>{
    const {status,attendance_id,student_id}=req.body;

    try {
        const query=`UPDATE e_attendance.Attendance
        SET attendance_status = $1
        WHERE attendance_id = $2
          AND student_id = $3
          AND admin_id = $4
        `
        const Result=await database.query(query,[status,attendance_id,student_id,req.userId])
        if(Result.rowCount>0){
            return res.status(400).json({message:"Record updated successfully"})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error, not updated"})
    }
}
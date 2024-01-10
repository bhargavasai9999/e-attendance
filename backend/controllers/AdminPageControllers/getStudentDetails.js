import { database } from "../../config/dbconnection.cjs";

export const getAllStudents=async(req,res)=>{
    try {
        const Result=await database.query(`
        SELECT *from e_attendance.Student WHERE associated_adminid=$1
        `,[req.userId])
        return res.json({ 
            data:Result.rows,
            message:"all student details"
        })
    } catch (error) {
        console.log(error)
    }

}

export const getStudentById=async(req,res)=>{

    try {
        const RollNumber=req.body.RollNumber
        const Result = await database.query(`
        SELECT *from e_attendance.Student WHERE roll_number=$1 AND associated_adminid=$2
        `,[RollNumber,req.userId])
    } catch (error) {
        console.log(error)
    }
}
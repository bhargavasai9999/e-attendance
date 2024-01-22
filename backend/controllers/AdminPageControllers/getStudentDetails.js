import { database } from "../../config/dbconnection.cjs";

export const getAllStudents=async(req,res)=>{
    try {
        const Result=await database.query(`
        SELECT * FROM e_attendance.Student WHERE associated_adminid = $1 ORDER BY roll_number ASC;
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
        let RollNumber=req.params.id
        RollNumber=RollNumber.toUpperCase()
        const Result = await database.query(`
        SELECT roll_number,name,email,mobile_number,password from e_attendance.Student WHERE roll_number=$1 AND associated_adminid=$2
        `,[RollNumber,req.userId])
       if(Result.rows.length>0){
        return res.status(200).json({
            message:"Fetched Student Details",
            data:Result.rows[0] || []
        })
       }
       else{
        return res.status(400).json({message:"Student not found"})
       }
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }
}
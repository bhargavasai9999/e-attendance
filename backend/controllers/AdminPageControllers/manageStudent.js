import { database } from "../../config/dbconnection.cjs";



export const addStudent=async (req,res)=>{

   try { 
   const {name,email,mobile_number,password}=req.body;
   
   //generate Roll NUmber
   const result=await database.query(`SELECT COUNT(*) AS StudentsCount FROM e_attendance.Student WHERE associated_adminid=$1`,[req.userId])
   const prefix=process.env.ROLL_NUMBER_PREFIX || "STUD"
   const rollNumber=`${prefix}+ ${result.rows[0]?.StudentsCount +1}`

   const query=`INSERT INTO e_attendance.Student (roll_number,name,email,mobile_number,password,associated_adminid) 
    VALUES ($1,$2,$3,$4,$5,$6)`
    const Result=await database.query(query,[rollNumber,name,email,mobile_number,password,req.userId])
   if(Result.rows.length >0){
      return res.json({message:"Student added Successfully"})
   }
   else{
      return res.json({message:"Student with Email already exists"})

   }

   } catch (error) {
    console.log(error)
    return res.json({message:"Internal Error"})
   }
}


export const editStudent=async (req,res)=>{
   try {
      const {studentId,name,email,mobile_number,password}=req.body;

      const query= `UPDATE e_attendance.Student 
      SET name=$1,email=$2,mobile_number=$3,password=$4
       WHERE studentid=$5 AND associated_adminid=$6`
      const Result=await database.query(query,[name,email,mobile_number,password,studentId,req.userId])

      if(Result.rowCount>0){
            return res.json({message:"Student details updated"})
      }
      else{
         return res.json({message:"Student Email already exists"})
      }
   

   } catch (error) {
      console.log(error)
      return res.json({message:"Internal Server Error"})
      
   }
}

export const deleteStudent=async (req,res)=>{
 
   try {
      const RollNumber=req.body.rollNumber

      const query=  `DELETE FROM e_attendance.Student WHERE roll_number=$1 AND associated_adminid=$2`
      const Result= await database.query(query,[RollNumber,req.userId])
      return res.json({message:"Student Deleted"})

   } catch (error) {
      console.log(error)
      return res.json({message:"Internal server errror"})
   }


}
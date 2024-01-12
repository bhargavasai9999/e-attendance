import { database } from "../../config/dbconnection.cjs";
import { generateRollNumber } from "../../utils/rollNumber.js";
import { sendEmail } from "../../utils/sendMail.js";



export const addStudent=async (req,res)=>{
   const {name,email,mobile_number,password}=req.body;

   try { 
   //generate Roll NUmber
   const prefix="STUD"
   const suffix=generateRollNumber()
   const rollNumber=prefix+suffix
   const query=`INSERT INTO e_attendance.Student (roll_number,name,email,mobile_number,password,associated_adminid) 
    VALUES ($1,$2,$3,$4,$5,$6)`
    const Result=await database.query(query,[rollNumber,name,email,mobile_number,password,req.userId])
    
    if(Result.rows.length >0){
      const data={
         subject:"Student login Credentials",
       text:"Login credentials for Student login from E-attendance",
       html_code:`
      <h3 style="color:black;">Hello, ${name}</h3>
      <div style="height:300px;width:300px;background-color:#dcf4f5;color:black;">
      <h3>         Your login credentials      </h3>
      <strong>Roll Number: </strong><p style="color:orange;">${rollNumber}</p>
      <strong>Password: </strong><p style="color:orange;">${password}</p>
      </div>
      `
      }
       
      sendEmail(email,data)
      return res.status(500).json({message:"Student added Successfully"})
   }
   else{
      return res.status(400).json({message:"Student with Email already exists"})

   }
   

   } catch (error) {
    console.log(error)
    return res.status(400).json({message:"Internal server errror"})
   }
}


export const editStudent=async (req,res)=>{
   const {studentId,name,email,mobile_number,password}=req.body;

   try {
      const query= `UPDATE e_attendance.Student 
      SET name=$1,email=$2,mobile_number=$3,password=$4
       WHERE studentid=$5 AND associated_adminid=$6`
      const Result=await database.query(query,[name,email,mobile_number,password,studentId,req.userId])

      if(Result.rowCount>0){
            return res.status(500).json({message:"Student details updated"})
      }
      else{
         return res.status(400).json({message:"Student Email already exists"})
      }
   

   } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Internal server errror"})
      
   }
}

export const deleteStudent=async (req,res)=>{
   const RollNumber=req.body.rollNumber

 
   try {

      const query=  `DELETE FROM e_attendance.Student WHERE roll_number=$1 AND associated_adminid=$2`
      const Result= await database.query(query,[RollNumber,req.userId])
      return res.status(500).json({message:"Student Deleted"})

   } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Internal server errror"})
   }


}
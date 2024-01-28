import { database } from "../../config/dbconnection.cjs";
import { generateRollNumber } from "../../utils/rollNumber.js";
import { sendEmail } from "../../utils/sendMail.js";


export const addStudent = async (req, res) => {
   const { name, email, mobile_number, password } = req.body;

   try {
      const checkResult=await database.query(`SELECT email from e_attendance.Student WHERE email=$1`,[email])
      if(checkResult.rowCount==0){
       const query =  `
       INSERT INTO e_attendance.Student (roll_number, name, email, mobile_number, password, associated_adminid) 
       VALUES ('STUD' || LPAD(nextval('e_attendance.student_roll_number_seq')::text, 5, '0'), $1, $2, $3, $4, $5)
       RETURNING roll_number;
     `
       
       const result = await database.query(query, [ name, email, mobile_number, password, req.userId]);
      console.log(result)
       if (result.rowCount > 0) {
           const rollNumber = result.rows[0].roll_number;

           const data = {
               subject: "Student login Credentials",
               text: "Your Login credentials for Student login from E-attendance",
               html_code: `
                   <h3 style="color:black;">Hello, ${name}</h3>
                   <h4>Login credentials for Student login from E-attendance</h4>
                   <div style="height:250px;width:250px;background-color:#dcf4f5;color:black;text-align:center;border-radius:20px;padding:20px;">
                       <h3 style="text-decoration:underline;color:orange;">Your login credentials</h3>
                       <strong>Roll Number: </strong><p style="color:orange;font-weight:bold;">${rollNumber}</p>
                       <strong>Password: </strong><p style="color:orange;font-weight:bold;">${password}</p>
                   </div>
               `
           };

           sendEmail(email, data);
           return res.status(200).json({ message: "Student added Successfully" ,data:result.rows[0]?.roll_number});
       } 
      }
      else {
           return res.status(400).json({ message: "Student with Email already exists" });
       }
   } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "Internal server error" });
   }
};



export const editStudent=async (req,res)=>{
   const {rollNumber,name,email,mobileNumber,password}=req.body;

   try {
      const query= `UPDATE e_attendance.Student 
      SET name=$1,email=$2,mobile_number=$3,password=$4
       WHERE roll_number=$5 AND associated_adminid=$6`
      const Result=await database.query(query,[name,email,mobileNumber,password,rollNumber,req.userId])
      if(Result.rowCount>0){
            return res.status(200).json({message:"Student details updated"})
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
   const RollNumber=req.params.id?.toUpperCase()

 
   try {

      const query=  `DELETE FROM e_attendance.Student WHERE roll_number=$1 AND associated_adminid=$2`
      const Result= await database.query(query,[RollNumber,req.userId])
      console.log(Result)
      return res.status(200).json({message:"Student Deleted"})

   } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Internal server errror"})
   }


}
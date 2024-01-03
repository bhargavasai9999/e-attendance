import { database } from "../../config/dbconnection.cjs";

export const verifyResetToken=async (req,res)=>{
    try{
    const {token,new_Password}=req.body
    const query= `UPDATE e_attendance.User SET password=$1 WHERE reset_token=$2 AND CURRENT_TIMESTAMP < expiry_time`
    const Result=await database.query(query,[new_Password,token])
    console.log(Result)
    if(Result.rowCount===0){
        return res.status(404).json({message:"Invalid URL or Expired"})
    }
    await database.query(`UPDATE e_attendance.User SET reset_token=$1,expiry_time=$2 WHERE reset_token=$3` ,[null,null,token])
    return res.status(200).json({message:"Password Updated Successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server error"})
    }

}
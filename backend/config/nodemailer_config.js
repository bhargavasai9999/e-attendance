import { createTransport } from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

export const transporter=createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.nodemailer_email,
          pass: process.env.nodemailer_passkey
        },
      })
export const sendEmail= async (email,token)=>{
  const resetURL=`http://localhost:3000/resetpassword/${token}`
    try { 
        const response = await transporter.sendMail({
            from: `"E-Attendance "<${process.env.nodemailer_email}>"`, // sender address
            to: email, //reciever address
            subject: "Password Change Request link from E-attendance", // Subject 
            text: "Password reset link", // text body
            html: `<h3>Reset Your Password </h3>
            <h4>Here is Your password reset link </h4>
            <strong>Expires In : </strong>30 Minutes
            <a  rel="noreferrer noopener" href="${resetURL}"target="_blank">click Here</a>
            <h4>Thank you...</h4>
            <strong>E-attendance Team</strong>`, 
          });
          console.log(response)
          return response;
    } catch (error) {
        console.log(error)
        
    }
}

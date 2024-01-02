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
export const sendEmail= async (email)=>{
    try {
        const response = await transporter.sendMail({
            from: `"E-Attendance "<${process.env.nodemailer_email}>"`, // sender address
            to: email, //reciever address
            subject: "Password Change Request link from E-attendance", // Subject 
            text: "Password reset link", // text body
            html: `<h3>Reset Your Password </h3>
            <p>Here is Your password reset link </p>
            <strong>Expires In : 30 Minutes</strong>
            <a href="http:localhost:5000/",target="_blank">click here</a>
            <h4>Thank you...</h4>
            <p>E-attendance team</p>`, // html body
          });
          console.log(response)
          return response;
    } catch (error) {
        console.log(error)
        
    }
}

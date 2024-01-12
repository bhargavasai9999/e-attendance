import { transporter } from "../config/nodemailer_config.js";
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail=async(email,data)=>{
try { 
    const response = await transporter.sendMail({
        from: `"E-Attendance "<${process.env.nodemailer_email}>"`, // sender address
        to: email, //reciever address
        subject: data.subject, // Subject 
        text: data.text, // text body
        html: data.html_code 
      });
      return response;
} catch (error) {
    console.log(error)
    
}
}
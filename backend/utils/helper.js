//file to generate jwt token

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export function generateToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
}

export async function sendEmail(to,subject,text){
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
          from: `"Nerdy Archive Library" <${process.env.EMAIL_USER}>`,
          to,
          subject,
          text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} successfully.`);
    }catch(error){
        console.error("Error sending email:", error);
        throw error;
    }
}
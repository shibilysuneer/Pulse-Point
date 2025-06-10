import nodemailer from 'nodemailer'

export const sendOtpEmail = async (email: string,subject: string, text: string) =>{ 
     try {
       const transporter = nodemailer.createTransport({
        service:'Gmail',
    auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    })
    const mailOptions = {
    from:  process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions); 
   console.log(`Email sent to ${email}`);
     } catch (error) {
        console.error("Error sending email:", error); 
     }  
    
}
const nodemailer = require("nodemailer");

// send mail function for email verification
const sendMail = async (email, emailToken) => {
    try {

        // transporting the email with nodemailer
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });
    
        const verificationLink = `${process.env.SERVER_URL}/api/verifyemail?emailToken=${emailToken}`;
    
        // email info from AdvisorAI to the user
        const mailOptions = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'AdvisorAI Email Verification',
            html:`<p> Verify your email address in AdvisorAI </p>
            <br>
            <a href="${verificationLink}">Verify your email here</a>
            `
        };
    
        // sending the email
        const info = await transport.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    }
    catch (err) {
        console.error("Error sending email:", err);
    }
}

module.exports = sendMail;
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

const sendMail = async (email, emailToken) => {
    try {
        const verificationLink = `${process.env.SERVER_URL}/api/verifyemail?emailToken=${emailToken}`;

        const msg = {
            from: process.env.EMAIL,
            to: email,
            subject: 'AdvisorAI Email Verification',
            html: `<p>Verify your email address in AdvisorAI</p>
                   <br>
                   <a href="${verificationLink}">Verify your email here</a>`
        };

        await sgMail.send(msg);
        console.log('Email sent successfully to:', email);

    } catch (err) {
        console.error('Error sending email:', err);
    }
};

const sendPasswordReset = async (email, resetToken) => {
    try {
        const resetURL = `${process.env.SERVER_URL}/api/resetpassword?token=${resetToken}`;

        const msg = {
            from: process.env.EMAIL,
            to: email,
            subject: 'AdvisorAI Password Reset',
            html: `<p>Reset your password in AdvisorAI</p>
                   <br>
                   <a href="${resetURL}">Reset your password here</a>`
        };

        await sgMail.send(msg);
        console.log('Reset Password email sent successfully to:', email);
    }
    catch (err) {
        console.error('Error sending reset password email:', err);
    }
};

module.exports = { sendMail, sendPasswordReset };
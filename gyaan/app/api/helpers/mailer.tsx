import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcryptjs from 'bcryptjs';
import VerifyEmail from './Verify';
import ResetPassword from './Reset';
import { render } from '@react-email/components';

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    // Fetch user data
    console.log("Mail", userID);
    console.log("Email Type", emailType);
    console.log(typeof emailType);

    const user = await User.findById(userID).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const username = user.username;

    // Hash the userID for token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);
    const verificationLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    const resetPasswordLink = `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    // Update user data based on emailType
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userID, {
        $set: {
          verifyToken: hashedToken,
          verifyExpires: Date.now() + 3600000, // 1 hour expiration
        }
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpires: Date.now() + 3600000, // 1 hour expiration
        }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const emailHtml = render(
      emailType === 'VERIFY'
        ? <VerifyEmail username={username} verificationLink={verificationLink} />
        : <ResetPassword userFirstname={username} resetPasswordLink={resetPasswordLink} />
    );

    // Mail options
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // recipient address
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password', // subject line
      html: emailHtml, // HTML body
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

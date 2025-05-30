import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '@/app/api/db/dbConfig';
import User from '@/app/api/models/userModel';
import { sendEmail } from '@/app/api/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        // Validations
        console.log(reqBody);
        console.log('====================================');

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

        return NextResponse.json({
            message: "User successfully registered",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

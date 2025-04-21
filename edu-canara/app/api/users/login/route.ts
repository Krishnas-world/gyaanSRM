import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
import User from '@/app/api/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        console.log("Request Body:", reqBody); // Debugging log

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found"); // Debugging log
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validPass = await bcryptjs.compare(password, user.password);
        if (!validPass) {
            console.log("Invalid credentials"); // Debugging log
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT!, { expiresIn: '7d' });

        const response = NextResponse.json({
            message: "Log in Successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        });

        return response;

    } catch (error: any) {
        console.error("API Error:", error.message); // Debugging log
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}

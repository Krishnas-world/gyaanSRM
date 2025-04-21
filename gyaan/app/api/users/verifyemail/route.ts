import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '@/app/api/db/dbConfig';
import User from '@/app/api/models/userModel';
import { sendEmail } from '@/app/api/helpers/mailer';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyExpires: { $gt: Date.now() } }) //user should be clicking on link after the current time
        if (!user) {
            return NextResponse.json({ message: 'Invalid token' },{status:400})
        }
        console.log(user);
        
        user.isVerified = true;
        user.verifyToken = null;
        user.verifyExpires = null;

        await user.save();

        return NextResponse.json({ message: "Email Verified Successfully", success:true},
            { status: 200 }
        )
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message},
            { status: 500 }
        )
    }

}
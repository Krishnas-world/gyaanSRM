import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
import User from '@/app/api/models/userModel';
import { getData } from '../../helpers/getData';

connect();

export async function POST(req: NextRequest) {
    try {
        const userID = getData(req);

        if (!userID) {
            return NextResponse.json({ message: "Login First!" }, { status: 401 }); // Return with 401 Unauthorized
        }

        const user = await User.findOne({ _id: userID }).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 }); // Return with 404 Not Found
        }

        return NextResponse.json({
            message: "User Found",
            success: true,
            user: user, // Optionally return user data
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Internal Server Error: " + error.message }, { status: 500 });
    }
}

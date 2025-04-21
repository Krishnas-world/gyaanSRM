import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
connect();

export async function POST(req: NextRequest) {
    try {
        const res = NextResponse.json({
            message: 'Logout success',
            success: true
        });

        // Clear the token cookie
        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set the cookie to expire immediately
            path: "/" // Ensure the path is correctly set
        });

        return res;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({
            message: 'Logout failed',
            success: false
        }, { status: 500 });
    }
}

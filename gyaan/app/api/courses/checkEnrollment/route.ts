import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
import Course from '../../models/courseModel';
connect();

export async function GET(req: NextRequest) {
    // Extract the courseCode and userId from the query parameters
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        // Check if userId is provided
        if (!userId) {
            return NextResponse.json({
                message: 'User ID is required',
                success: false,
            }, { status: 400 });
        }

        // check userId is enrolled in how many courses
        const courses = await Course.find({ enrolledUsers: userId });
        if (courses.length === 0) {
            return NextResponse.json({
                message: 'User is not enrolled in any courses',
                success: false,
            }, { status: 404 });
        }

        // If the user is enrolled in courses, return the list of courses
        return NextResponse.json({
            message: 'Courses found',
            success: true,
            courses,
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Error occurred while checking enrollment',
            success: false,
        }, { status: 500 });
    }
}
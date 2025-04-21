import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
import Course from '@/app/api/models/courseModel';
connect();

export async function GET(req: NextRequest) {
    try {
        const courses = await Course.find({});
        if (!courses || courses.length === 0) {
            return NextResponse.json({
                message: 'No courses found',
                success: false,
            }, { status: 404 });
        }
        return NextResponse.json({
            message: 'Courses found',
            success: true,
            courses,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Error occurred while fetching courses',
            success: false,
        }, { status: 500 });
    }
}
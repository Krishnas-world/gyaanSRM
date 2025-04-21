import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/db/dbConfig';
import Course from '@/app/api/models/courseModel';
connect();

export async function POST(req: NextRequest) {
    try {
        const { courseCode, userId } = await req.json();
        console.log('Received data:', { courseCode, userId });

        // Check if the course exists
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return NextResponse.json({
                message: 'Course not found',
                success: false
            }, { status: 404 });
        }

        // Check if the user is already enrolled in the course
        const isEnrolled = course.enrolledUsers.includes(userId);
        if (isEnrolled) {
            return NextResponse.json({
                message: 'User already enrolled in this course',
                success: false
            }, { status: 400 });
        }

        // Enroll the user in the course
        course.enrolledUsers.push(userId);
        await course.save();
        console.log('User enrolled successfully:', course.enrolledUsers);

        return NextResponse.json({
            message: 'User enrolled successfully',
            success: true,
            enrolledUsers: course.enrolledUsers
        }, { status: 200 });

    } catch (error) {
        console.error('Error during course enrollment:', error);
        return NextResponse.json({
            message: 'Enrollment failed',
            success: false
        }, { status: 500 });
    }
}
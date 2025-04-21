import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
});

const courseSchema = new Schema({
    faculty_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    assignment: {
        type: [assignmentSchema],
        required: true
    },
    descripion: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    courseDuration: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true,
        unique: true // It's a good practice to make courseCode unique
    },
    enrolledUsers: {
        type: [String], // Array of user IDs (or any other identifier for users)
        default: [] // Default to an empty array
    }
});

// Check if the model already exists before compiling it
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
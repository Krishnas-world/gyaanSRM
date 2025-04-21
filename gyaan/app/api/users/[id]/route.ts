import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connect } from '../../db/dbConfig';
import User from '../../models/userModel';
import mongoose from 'mongoose';

interface DecodedToken {
  id: string;
}

// GET request handler
export async function GET(request: Request) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  try {
    await connect();

    const decodedToken = jwt.verify(token, process.env.JWT!) as DecodedToken;
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Find the user and change history
    const user = await User.findById(id).select('-password'); // Exclude password for security
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: user.toObject(), // Send the full user object
      changeHistory: user.changeHistory
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}

// PUT request handler
export async function PUT(request: Request) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  try {
    await connect();

    const decodedToken = jwt.verify(token, process.env.JWT!) as DecodedToken;
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    // Parse request body
    const updates = await request.json();

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validate updates
    if (typeof updates !== 'object' || updates === null) {
      return NextResponse.json({ error: 'Invalid updates format' }, { status: 400 });
    }

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Define primary fields to exclude from changeHistory
    const primaryFields = ['username', 'email', 'password', 'isVerified', 'isAdmin', 'forgotPasswordToken', 'forgotPasswordExpires', 'verifyToken', 'verifyExpires'];

    // Filter out primary fields from updates
    const filteredUpdates = Object.keys(updates).reduce((acc, key) => {
      if (!primaryFields.includes(key)) {
        acc[key] = updates[key];
      }
      return acc;
    }, {} as { [key: string]: any });

    // Check if a change history entry exists
    let changeHistoryEntry = user.changeHistory.find((change: any) => {
      return JSON.stringify(change.updatedFields) === JSON.stringify(filteredUpdates);
    });

    if (changeHistoryEntry) {
      // Update existing change object
      changeHistoryEntry.date = new Date();
    } else {
      // Create new change entry
      changeHistoryEntry = {
        date: new Date(),
        updatedFields: filteredUpdates,
      };
      user.changeHistory = [changeHistoryEntry]; // Ensure only one entry in history
    }

    // Update the user and change history
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        $set: {
          ...updates, // Update user details
          changeHistory: user.changeHistory // Update change history
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Error updating user data' }, { status: 500 });
  }
}

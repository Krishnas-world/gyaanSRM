import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const getData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return null; // No token provided
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT!);
        return decodedToken.id;
    } catch (error: any) {
        return null; // Invalid token
    }
};

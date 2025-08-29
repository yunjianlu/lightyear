import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import {
  generateToken,
  validatePassword,
  validateEmail,
} from "../../../lib/auth";
export const runtime = "nodejs";

// Initialize database on first run

export async function POST(request) {
  // MongoDB connection
  const uri = process.env.MONGODB_URI;
  const dbName = "productsDB";
  const collectionName = "users";
  try {
    const body = await request.json();
    const {
      action,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      confirmPassword,
    } = body;

    // Get client IP for logging
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Connect to MongoDB Atlas
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const users = db.collection(collectionName);

    if (action === "register") {
      // Registration logic
      if (password !== confirmPassword) {
        return NextResponse.json(
          { success: false, message: "Passwords do not match" },
          { status: 400 }
        );
      }
      const passwordValid = validatePassword(password);
      if (!passwordValid.isValid) {
        return NextResponse.json(
          { success: false, message: passwordValid.errors[0] },
          { status: 400 }
        );
      }
      const existingUser = await users.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "User already exists" },
          { status: 400 }
        );
      }
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      try {
        const result = await users.insertOne({
          email: email.toLowerCase(),
          password_hash: hashedPassword,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone_number: phoneNumber ? phoneNumber.trim() : null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true,
        });
        const token = generateToken({
          userId: result.insertedId,
          email: email.toLowerCase(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        });
        const response = NextResponse.json({
          success: true,
          message: "Account created successfully",
          user: {
            id: result.insertedId,
            email: email.toLowerCase(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phoneNumber: phoneNumber?.trim(),
          },
        });
        response.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 86400, // 1 day
        });
        return response;
      } catch (error) {
        console.error("MongoDB insert error:", error);
        return NextResponse.json(
          { success: false, message: "Failed to create account" },
          { status: 500 }
        );
      }
    } else if (action === "login") {
      // Login logic
      const user = await users.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
      if (!user.is_active) {
        return NextResponse.json(
          { success: false, message: "Account is inactive" },
          { status: 403 }
        );
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, message: "Invalid password" },
          { status: 401 }
        );
      }
      await users.updateOne(
        { _id: user._id },
        { $set: { last_login: new Date() } }
      );
      const token = generateToken({
        userId: user._id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      });
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phoneNumber: user.phone_number,
        },
      });
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 day
      });
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error occurred during authentication:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Try to get user info before logging out
    const token = request.cookies.get("auth-token")?.value;
    let userId = null;

    if (token) {
      try {
        const jwt = require("jsonwebtoken");
        const decoded = jwt.decode(token); // Not verifying here, just decoding
        userId = decoded?.userId;
      } catch (error) {
        // Token invalid, but that's okay, we can still log out
        console.error("Error decoding token:", error);
      }
    }

    // Clear the auth token cookie
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the auth token cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

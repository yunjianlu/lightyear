import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase, initializeDatabase } from '../../../lib/database';
import { generateToken, validatePassword, validateEmail } from '../../../lib/auth';

// Initialize database on first run
initializeDatabase();

export async function POST(request) {
    try {
        const body = await request.json();
        const { action, email, password, firstName, lastName, phoneNumber, confirmPassword } = body;

        // Get client IP for logging
        const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Validate email format
        if (!validateEmail(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }
        
        const db = getDatabase();

        if (action === 'register') {
            // Registration logic
            // Check if passwords match
            if (password !== confirmPassword) {
                return NextResponse.json(
                    { success: false, message: 'Passwords do not match' },
                    { status: 400 }
                );
            }

            // Validate password strength
            const passwordValid = validatePassword(password);
            if (!passwordValid.isValid) {
                return NextResponse.json(
                    { success: false, message: passwordValid.errors[0] },
                    { status: 400 }
                );
            }

            // Check if user already exists
            const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: 'User already exists' },
                    { status: 400 }
                );
            }

            // Hash password with salt
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user into database
            const insertUser = db.prepare(`
                INSERT INTO users (email, password_hash, first_name, last_name, phone_number, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
            `);

            try {
                const result = insertUser.run(
                    email.toLowerCase(),
                    hashedPassword,
                    firstName.trim(),
                    lastName.trim(),
                    phoneNumber ? phoneNumber.trim() : null
                );

                // Generate JWT token
                const token = generateToken({ 
                    userId: result.lastInsertRowid, 
                    email: email.toLowerCase(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                });

                // Set HTTP-only cookie with token
                const response = NextResponse.json({
                    success: true,
                    message: 'Account created successfully',
                    user: {
                        id: result.lastInsertRowid,
                        email: email.toLowerCase(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        phoneNumber: phoneNumber?.trim()
                    }
                });
                response.cookies.set('auth-token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 86400 // 1 day
                });
                return response;

            } catch (error) {
                console.error('Database insert error:', error);
                return NextResponse.json(
                    { success: false, message: 'Failed to create account' },
                    { status: 500 }
                );
            }

        } else if (action === 'login') {
            // Login logic

            // Find user by email
            const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
            if (!user) {
                return NextResponse.json(
                    { success: false, message: 'User not found' },
                    { status: 404 }
                );
            }

            // Check if account is active
            if (!user.is_active) {
                return NextResponse.json(
                    { success: false, message: 'Account is inactive' },
                    { status: 403 }
                );
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return NextResponse.json(
                    { success: false, message: 'Invalid password' },
                    { status: 401 }
                );
            }

            // Update last login time
            const updateLastLogin = db.prepare('UPDATE users SET last_login = datetime(\'now\') WHERE id = ?');
            updateLastLogin.run(user.id);

            // Generate JWT token
            const token = generateToken({ 
                userId: user.id, 
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            });

            // Set HTTP-only cookie with token
            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phoneNumber: user.phone_number
                }
            });
            response.cookies.set('auth-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400 // 1 day
            });
            return response;
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid action' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error occurred during authentication:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE(request) {
    try {
        const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Try to get user info before logging out
        const token = request.cookies.get('auth-token')?.value;
        let userId = null;

        if (token) {
            try {
                const jwt = require('jsonwebtoken');
                const decoded = jwt.decode(token); // Not verifying here, just decoding
                userId = decoded?.userId;
            } catch (error) {
                // Token invalid, but that's okay, we can still log out
                console.error('Error decoding token:', error);
            }
        }

        // Clear the auth token cookie
        const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
        
        // Clear the auth token cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0 // Expire immediately
        });

        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}


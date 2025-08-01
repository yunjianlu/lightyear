import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getDatabase } from './database';

// Environment-based JWT secret configuration
const getJwtSecret = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: strict requirement for JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    if (process.env.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters long in production');
    }
    return process.env.JWT_SECRET;
    } else {
    // Development: helpful defaults with warnings
    if(!process.env.JWT_SECRET) {
      console.warn('DEVELOPMENT MODE: Using auto-generated JWT secret');
      console.warn('For production, set JWT_SECRET environment variable');
      console.warn('This is NOT secure for production use');
      return 'dev-only-' + crypto.randomBytes(32).toString('hex');
    }
    return process.env.JWT_SECRET;
  }
};

const JWT_SECRET = getJwtSecret();

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Middleware function to protect routes
export async function requireAuth(request) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        // Optional: Check if user still exists and is active
        const db = getDatabase();
        const user = db.prepare('SELECT id, email, first_name, last_name, is_active FROM users WHERE id = ?').get(decoded.userId);

        if(!user || !user.is_active) {
            return NextResponse.json(
                { success: false, message: 'User not found or inactive' },
                { status: 401 }
            );
        }

        // Add user info to request (access this in API routes)
        return { user: decoded, dbUser: user };
    } catch (error) {
        console.error('Authentication middleware error:', error);
        return NextResponse.json(
            { success: false, message: 'Authentication failed' },
            { status: 500 }
        );
    }
}

// Helper function to get current user from request
export async function getCurrentUser(request) {
    try {
        const token = request.cookies.get('auth-token')?.value;
        if (!token) return null;

        const decoded = verifyToken(token);
        if (!decoded) return null;

        // Fetch user from database
        const db = getDatabase();
        const user = db.prepare('SELECT id, email, first_name, last_name, phone_number, created_at FROM users WHERE id = ?').get(decoded.userId);
        
        return user;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

// Password validation function
export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumber) {
        errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
        errors.push('Password must contain at least one special character');
    }

     return {
        isValid: errors.length === 0,
        errors
     };
}

// Email validation function
export function validateEmail(email) {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email) ? true : "Please enter a valid email address";
}



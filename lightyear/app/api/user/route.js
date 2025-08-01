import { NextResponse } from 'next/server';
import { requireAuth, getCurrentUser } from '../../../lib/auth';
import { getDatabase } from '../../../lib/database';

// GET - get current user details
export async function GET(request) {
    try {
        const user = await getCurrentUser(request);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not authenticated' },
                { status: 401 }
            );
        }

        return NextResponse.json({ 
            success: true, 
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                phoneNumber: user.phone_number,
                createdAt: user.created_at
            } 
        });
    } catch (error) {
        console.error('Error occurred while fetching user details:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - update user details
export async function PUT(request) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) {
            return authResult; // Return error response if authentication failed
        }
        
        const { user } = authResult;
        const body = await request.json();

        const { firstName, lastName, phoneNumber } = body;

        // Get client IP 
        const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Validate input
        if (!firstName?.trim() || !lastName?.trim()) {
            return NextResponse.json(
                { success: false, message: 'First name and last name are required' },
                { status: 400 }
            );
        }

        const db = getDatabase();

        // Update user details in the database
        const updateUser = db.prepare(`
            UPDATE users 
            SET first_name = ?, last_name = ?, phone_number = ?, updated_at = datetime('now')
            WHERE id = ?
        `);

        updateUser.run(firstName.trim(), lastName.trim(), phoneNumber?.trim() || null, user.user.id);

        // Get updated user data
        const updatedUser = db.prepare(`
            SELECT id, email, first_name, last_name, phone_number
            FROM users 
            WHERE id = ?
        `).get(user.user.id);

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                firstName: updatedUser.first_name,
                lastName: updatedUser.last_name,
                phoneNumber: updatedUser.phone_number
            }
        });
    } catch (error) {
        console.error('Error occurred while updating user profile:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update profile' },
            { status: 500 }
        );
    }
}

// DELETE - delete user account
export async function DELETE(request) {
  try {
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult; // Return error response
    }

    const { user } = authResult;
    const body = await request.json();
    const { password, confirmDelete } = body;

    // Get client IP for security logging
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Validate deletion confirmation
    if (!confirmDelete || confirmDelete !== 'DELETE MY ACCOUNT') {
      return NextResponse.json(
        { success: false, message: 'Account deletion not confirmed' },
        { status: 400 }
      );
    }

    // Validate password for security
    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password required for account deletion' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Get user record to verify password
    const dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(user.userId);
    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify password
    const bcrypt = require('bcryptjs');
    const isValidPassword = await bcrypt.compare(password, dbUser.password_hash);
    if (!isValidPassword) {
      logSecurityEvent('account_deletion_failed_invalid_password', { 
        userId: user.userId, 
        email: user.email, 
        clientIP 
      });
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Soft delete: deactivate account instead of hard delete
    // This preserves data integrity and allows for account recovery
    const deactivateUser = db.prepare(`
      UPDATE users 
      SET is_active = 0, updated_at = datetime('now')
      WHERE id = ?
    `);

    deactivateUser.run(user.userId);

    // Log security event for account deletion
    // Logging would go here

    // Clear auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Account has been deactivated successfully'
    });

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    return response;

  } catch (error) {
    console.error('Delete user account error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
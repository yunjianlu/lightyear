import Database from 'better-sqlite3';
import path from 'path';

let db = null;

export function getDatabase() {
    if (!db) {
        // Create database file in project root
        const dbPath = path.join(process.cwd(), 'lightyear.db');

        // Log database location for development
        if (process.env.NODE_ENV === 'development') {
            console.log('Database location:', dbPath);
        }

        // Initialize the database connection
        db = new Database(dbPath);

        // Enable WAL mode for better concurrency
        db.pragma('journal_mode = WAL');

        // Enable foreign keys
        db.pragma('foreign_keys = ON');

        // Set busy timeout in milliseconds (this is the correct way)
        db.pragma('busy_timeout = 5000');

        console.log('Database connection established');
    }

    return db;
}

export function initializeDatabase() {
    const db = getDatabase();

    console.log('Initializing database...');

    // Create users table if it doesn't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone_number TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            last_login TEXT,
            email_verified INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1
        );
    `);

    console.log('Database initialized');

    // Create index on email for faster lookups
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    // Create sessions table for tracking user sessions
    db.exec(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_token TEXT UNIQUE NOT NULL,
            expires_at TEXT NOT NULL,
            created_at TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    // Create index on session token
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
    `);

    // Create index on user_id for sessions
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    `);

    // Create security logs table for tracking auth events
    db.exec(`
        CREATE TABLE IF NOT EXISTS security_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            event_type TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            success INTEGER NOT NULL,
            details TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
        );
    `);

    // Create index on security logs for monitoring
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
    `);

    console.log('Database schema initialized successfully');

    // Log some basic stats for development
    if(process.env.NODE_ENV === 'development') {
        const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
        const sessionCount = db.prepare('SELECT COUNT(*) as count FROM sessions').get().count;
        console.log(`Users: ${userCount}, Sessions: ${sessionCount}`);
    }
}

export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
        console.log('Database connection closed');
    }
}
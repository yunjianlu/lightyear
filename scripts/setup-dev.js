const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

console.log('Setting up development environment...');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✓ .env.local already exists');
  process.exit(0);
}

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Create .env.local content
const envContent = `# Development environment variables
JWT_SECRET=${jwtSecret}
NODE_ENV=development

# Add other environment variables here as needed
`;

// Write the file
fs.writeFileSync(envPath, envContent);

console.log('✓ Created .env.local with secure JWT secret');
console.log('✓ Development environment ready!');
console.log('\nNOTE: .env.local is ignored by git for security');
console.log('Each team member will have their own local secrets');
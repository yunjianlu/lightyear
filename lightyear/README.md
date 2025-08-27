This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the setup script to create your environment file:
```bash
npm run setup
```

This will create a .env.local file with a secure JWT secret for authentication.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

The setup script automatically creates a .env.local file with:

JWT_SECRET: Used for authentication token signing
NODE_ENV: Set to development

Note: .env.local is ignored by git for security. Each team member gets their own unique secrets.

## Authentication System

This project includes a custom authentication system with:

* User registration and login
* Password hashing with bcrypt
* JWT token-based authentication
* SQLite database for user storage
* HTTP-only cookies for security


## Test database

After creating a user account, a database will appear in the project root called lightyear.db

You can look at the DB schema:
``` bash
.schema users
```

You can test that users are being properly stored by running the following: 

```bash
sqlite3 lightyear.db
SELECT * FROM users;
```

This will show the user that was created with salted and hashed passwords, created_at times, and session information.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Globetrotter

<p align="center">
  <img src="public/map-pin-blue.svg" alt="Globetrotter Logo" width="100" />
</p>

## 📝 About

Globetrotter is an interactive travel-themed guessing game that challenges players to identify famous destinations around the world based on cryptic clues. Players earn points by correctly guessing destinations, compete on leaderboards, and can challenge friends to beat their scores.

## 🛠️ Tech Stack

- **Frontend:**
  - Next.js 15.2.0 (App Router)
  - React 19.0.0
  - TypeScript
  - Tailwind CSS for styling
  - Lucide React for icons
  - Radix UI for accessible components

- **Backend:**
  - Next.js API Routes
  - MongoDB for database
  - Mongoose as ODM
  - NextAuth.js for authentication
  - bcrypt.js for password hashing

- **Email:**
  - Resend for email delivery
  - React Email for email templates

## ✨ Features

- **User Authentication System**
  - Email/password registration with verification
  - Secure login with NextAuth.js
  - Route protection with middleware
  
- **Game Mechanics**
  - Cryptic clues about famous destinations
  - Progressive hint system (each additional clue costs points)
  - Points-based scoring system
  - Fun facts about destinations after guessing
  
- **Social Features**
  - Global leaderboard showing top players
  - Challenge system to invite friends
  - Shareable invitation links
  
- **User Experience**
  - Clean, modern UI with responsive design
  - Animated components and transitions
  - Confetti celebration for correct answers
  - Dark mode optimized interface

## �� Folder Structure

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

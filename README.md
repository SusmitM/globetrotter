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
  - ShadCN UI 

- **Backend:**
  - Next.js API Routes
  - MongoDB for database
  - Mongoose as ODM
  - NextAuth.js for authentication


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


## 🗄️ Database Architecture

### User Collection
- **username** (String, Unique, Required) - The player's unique username.
- **email** (String, Unique, Required) - The player's email for authentication.
- **password** (String, Optional) - Hashed password for authentication.
- **verifyCode** (String, Optional) - Code sent for email verification.
- **verifyCodeExpiry** (Date, Optional) - Expiration time for the verification code.
- **isVerified** (Boolean, Default: false) - Indicates if the user has verified their account.
- **invitedBy** (String, Optional) - Stores the username of the inviter.
- **highScore** (Number, Default: 0) - Highest score achieved by the player.

### Destination Collection
- **city** (String, Unique, Required) - Name of the city being guessed.
- **country** (String, Required) - Country the city belongs to.
- **clues** (Array of Strings, Required) - List of hints about the destination.
- **fun_fact** (Array of Strings, Required) - Interesting facts about the destination.
- **trivia** (Array of Strings, Required) - Trivia related to the destination.


## 📂 Folder Structure

```
/globetrotter
|-- /public
|-- /src
|   |-- /app
|   |   |-- /api
|   |   |   |-- /auth
|   |   |   |   |-- [...nextauth]
|   |   |   |   |   |-- options.ts
|   |   |   |   |   |-- route.ts
|   |   |   |-- /game
|   |   |   |   |-- check-answer
|   |   |   |   |   |-- route.ts
|   |   |   |   |-- next-clue
|   |   |   |   |   |-- route.ts
|   |   |   |-- /seed
|   |   |   |   |-- route.ts
|   |   |   |-- /sign-up
|   |   |   |   |-- route.ts
|   |   |   |-- /verify-code
|   |   |   |   |-- route.ts
|   |   |   |-- /create-invitation
|   |   |   |   |-- route.ts
|   |   |-- /(app)
|   |   |   |-- /dashboard
|   |   |   |   |-- /game
|   |   |   |   |   |-- page.tsx
|   |   |   |   |-- page.tsx
|   |   |   |-- /layout.tsx
|   |   |   |-- /page.tsx
|   |   |-- /(auth)
|   |   |   |-- /sign-in
|   |   |   |   |-- page.tsx
|   |   |   |-- /verify
|   |   |   |   |-- [username]
|   |   |   |   |   |-- page.tsx
|   |   |-- /layout.tsx
|   |   |-- /globals.css
|
|-- /components
|   |-- /ui
|   |   |-- alert-dialog.tsx
|   |   |-- button.tsx
|   |   |-- form.tsx
|   |   |-- input.tsx
|   |   |-- toaster.tsx
|   |-- DashboardTile.tsx
|   |-- Footer.tsx
|   |-- Navbar.tsx
|
|-- /context
|   |-- AuthProvider.tsx
|   |-- StateProvider.tsx
|
|-- /emails
|   |-- VerificationEmail.tsx
|
|-- /helpers
|   |-- sendVerificationEmail.ts
|
|-- /lib
|   |-- dbConnect.ts
|   |-- resend.ts
|   |-- utils.ts
|
|-- /model
|   |-- Destination.ts
|   |-- User.ts
|
|-- README.md
```

## 🛠️ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure environment variables (see below).
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env` file and add the following:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
RESEND_API_KEY=your-resend-api-key
```

## 🚀 Deployment

Globetrotter can be deployed on Vercel, AWS, or other cloud platforms.

### Deploy on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Run the deployment command:
   ```sh
   vercel
   ```
3. Follow the CLI prompts to deploy your app.

# Travel Agency - Full Stack Application

A full-stack web application for booking flights with a fake payment system and user bank account management.

## Features

- Search and browse available flights
- Book flights with passenger names
- Payment system with bank account balance


### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Default User

- User ID: `user-1`
- Name: John Traveler
- Starting Balance: $500

No login required - the app assumes you're already logged in as this user.

## How to Use

1. Start the backend and frontend
2. Browse available flights using the search bar
3. Enter your passenger name and click "Book Flight"
4. Your bank balance will be deducted from your account
5. View your bookings in the "My Bookings" tab
6. Cancel bookings to receive a refund to your account


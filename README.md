# ChatApp

A real-time one-to-one chat application with live messaging, online presence, real last-seen times and a fully responsive, full-screen interface that works on desktop and mobile.

**Live demo:** https://chatapp-rho-khaki.vercel.app/ · **Backend repo:** [chatapp-backend](https://github.com/Abbas-Abubakar/chatapp-backend)

<img width="1919" height="924" alt="image" src="https://github.com/user-attachments/assets/b7493cbf-f03e-42a8-bef0-cd71273fb8ea" />
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/40531346-150f-4d93-a66a-6f4db1249ee6" />


## Features

- **Real-time messaging** over WebSockets (Socket.io)
- **Online status** shown live in the chat list and chat header
- **Last seen** saved to the database when a user goes offline, shown as "Last seen 5 min ago", "yesterday at 09:10" and so on
- **Last message preview** in each conversation, truncated with an ellipsis, with the chat list sorted by most recent activity
- **Initials avatars** with a consistent color per user, no third-party image service
- **Secure auth:** JWT in an `httpOnly` cookie, passwords hashed with bcrypt, protected API routes
- **Responsive, full-screen UI:** split view on desktop, list-then-chat flow with a back button on mobile
- Loading skeletons, empty states, form validation and toast notifications

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS v4, daisyUI, Zustand, React Router, Socket.io client |
| Backend | Node.js, Express, Socket.io |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens, bcryptjs, cookie-parser |
| Hosting | Vercel (frontend), Render (backend) |

## Architecture

```
Browser (React)
   │  REST  → /auth  /users  /message   (cookie auth)
   │  WS    → Socket.io (online users, new messages, last seen)
   ▼
Express + Socket.io server  ──►  MongoDB (Users, Messages, Conversations)
```

- The REST API handles signup, login, the user list (with each user's last message) and message history.
- Socket.io pushes new messages, the online users list and last-seen updates to connected clients.
- When a user's last connection closes, the server stores `lastSeen` and broadcasts it.

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or Atlas)

### 1. Backend

```bash
git clone https://github.com/Abbas-Abubakar/chatapp-backend.git
cd chatapp-backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_url
JWT_SECRET=replace-with-a-long-random-string
NODE_ENV=your_node_env
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 2. Frontend

```bash
git clone https://github.com/Abbas-Abubakar/chatapp.git
cd frontend
npm install
```

Create `.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

```bash
npm run dev
```

Open `http://localhost:5173`, sign up with two accounts in two browsers, and start chatting.

## API overview

| Method | Route | Description |
| --- | --- | --- |
| POST | `/auth/signup` | Create an account |
| POST | `/auth/login` | Log in |
| POST | `/auth/logout` | Log out |
| GET | `/users` | Other users with `lastSeen` and last message |
| GET | `/message/:id` | Message history with user `:id` |
| POST | `/message/send/:id` | Send a message to user `:id` |

**Socket events:** `getOnlineUsers`, `newMessage`, `userLastSeen`

## Deployment

- **Backend (Render):** build command `npm install`, start command `npm start`. Set `MONGO_DB_URI`, `JWT_SECRET`, `NODE_ENV=production` and `CLIENT_URL` (your frontend URL).
- **Frontend (Vercel):** set `VITE_BACKEND_URL` to the Render URL and add a `vercel.json` that rewrites `/auth`, `/users` and `/message` to the backend and sends all other paths to `index.html`. Proxying through Vercel keeps the auth cookie first-party.
- Render's free tier sleeps when idle, so the first request after a while can take up to a minute.

## Project structure

```
backend/
├── controllers/   auth, user, message logic
├── middleware/    JWT route protection
├── model/         User, Message, Conversation
├── routes/
├── socket/        Socket.io server, online users map
└── server.js

frontend/src/
├── components/    sidebar, messages, Avatar
├── hooks/         data fetching, socket listeners, last seen
├── pages/         home, login, signup
├── utils/         time and last-seen formatting
└── zustand/       auth, socket and conversation stores
```

## Roadmap

- Unread message counters
- Typing indicators
- Image and file sharing
- Message delivery and read receipts

## Author

**Abbas Abubakar** · [GitHub](https://github.com/Abbas-Abubakar) 

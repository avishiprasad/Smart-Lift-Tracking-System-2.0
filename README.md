Live Demo : https://smart-lift-tracking-system-2-0.vercel.app

🚀 Smart Lift Tracking System (SLTS)
A real-time elevator monitoring and management platform that simulates lift operations in a multi-floor building using intelligent scheduling, live tracking, maintenance monitoring, analytics, and WebSocket-based updates.


📌 Overview
The Smart Lift Tracking System (SLTS) is designed to optimize elevator operations in modern buildings.
The platform provides:

- Real-time lift monitoring
- Intelligent lift assignment
- Request management
- Maintenance scheduling
- Activity logging
- Operational analytics
- Live WebSocket updates

The system simulates actual elevator movement and demonstrates concepts from Operating Systems, Distributed Systems, Real-Time Systems, and Full Stack Development.

✨ Features

### 🚡 Lift Management

- Create, update and delete lifts
- Configure serving floors
- Real-time lift status tracking
- Current floor and target floor monitoring
- Direction tracking (UP / DOWN / IDLE)

### 👥 Passenger Request Management

- Create lift requests
- Automatic lift assignment
- Request lifecycle tracking
- Pickup and drop-off scheduling
- Request status monitoring

### ⚡ Real-Time Monitoring

- Live lift movement updates
- WebSocket-based communication
- Automatic dashboard refresh
- Real-time queue updates

### 🛠 Maintenance Management

- Schedule maintenance activities
- Track engineer assignments
- Service history management
- Maintenance status monitoring
- Risk score tracking

### 📊 Analytics Dashboard

- Lift status distribution
- Request status breakdown
- Requests per lift
- Completed vs Pending requests
- System-wide operational metrics

### 📜 Activity Logs

- Lift movement logs
- Pickup and drop-off logs
- Maintenance logs
- User actions tracking

### 🔔 Notifications

- System alerts
- Maintenance notifications
- Emergency notifications
- Real-time event updates

---

## 🏗 System Architecture

```text
┌─────────────────────┐
│      Frontend       │
│ Next.js + React     │
└──────────┬──────────┘
           │ REST API
           │ WebSocket
           ▼
┌─────────────────────┐
│      Backend        │
│ Express + Node.js   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     MongoDB Atlas   │
└─────────────────────┘

## ⚙️ Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Query
- Recharts
- Framer Motion
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

### Database

- MongoDB Atlas

### Real-Time Communication

- Socket.IO


## 🧠 Scheduling Algorithm

The system uses a load-balanced lift assignment strategy.

### Lift Selection Score

Score = Distance + (Queue Length × 2)

Where:

- Distance = absolute difference between lift floor and requested floor
- Queue Length Penalty = prevents overloading one lift

The lift with the lowest score is assigned.

 🚀 Queue Scheduling

The request queue follows a SCAN/LOOK-inspired strategy.

Benefits:

- Reduces unnecessary lift reversals
- Improves passenger wait time
- Optimizes travel path
- Minimizes idle movement

## 📂 Database Collections

### Lift

```js
{
  liftNumber,
  servingFloors,
  currentFloor,
  targetFloor,
  direction,
  status,
  occupancy,
  eta,
  requestQueue
}
```

### LiftRequest

```js
{
  requestedFloor,
  destinationFloor,
  direction,
  assignedLift,
  status
}
```

### Maintenance

```js
{
  engineer,
  description,
  riskScore,
  lastServiceDate,
  nextServiceDate,
  status
}
```

### ActivityLog

```js
{
  action,
  performedBy,
  lift,
  description
}
```

### Notification

```js
{
  type,
  title,
  message
}
```

---

## 🔄 Real-Time Workflow

1. Passenger creates request
2. Scheduler selects optimal lift
3. Request added to lift queue
4. Lift Engine moves lift floor-by-floor
5. Status updated automatically
6. Socket.IO broadcasts updates
7. Dashboard refreshes instantly

---


## 🛠 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/SLTS.git
cd SLTS
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Run frontend

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

## 🎯 Learning Outcomes

This project demonstrates:

- Real-Time Systems
- WebSocket Communication
- Scheduling Algorithms
- Event-Driven Architecture
- Queue Management
- REST APIs
- Full Stack Development
- MongoDB Data Modeling
- React Query State Management


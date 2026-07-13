# CodeGuru 1.0

## Project Structure
- frontend/ - 
     TECH STACK OF FORNTEND
     REACT + VITE + TAILWINDCSS


# CodeGuru 1.0

AI-Powered Online Coding Assessment Platform

CodeGuru is an AI-powered coding assessment platform designed for educational institutions and organizations. It enables teachers and administrators to create coding assessments, evaluate students automatically, monitor coding activities, and generate detailed performance reports.

---

# Features

## Authentication
- Student Login & Registration
- Teacher Login & Registration
- Admin Login
- JWT Authentication
- Role-Based Authorization

## Assessment Module
- Create Assessment
- Update Assessment
- Delete Assessment
- Publish Assessment
- Assessment Management

## Question Module
- Create Coding Questions
- Difficulty Levels
- Public Test Cases
- Hidden Test Cases (Upcoming)

## Submission Module
- Code Submission
- Submission History
- Auto Save
- Run Code

## Attempt Module
- Start Assessment
- Submit Assessment
- Attempt Tracking

## Local Compiler
- Self-Hosted Compiler
- Docker + Piston
- JavaScript
- Python
- Java
- C/C++
- Custom Input Support

---

# Project Structure

```
CodeGuru1.0
│
├── backend
├── frontend
├── compiler
│   └── docker-compose.yml
├── README.md
└── .gitignore
```

> **Note:** The `piston/` directory is **not included** in this repository because it is the official Piston source code. Clone it separately as described below.

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Local Compiler Setup

## 1. Install Docker Desktop

Install Docker Desktop and ensure Docker Engine is running.

---

## 2. Clone Official Piston Repository

```bash
git clone https://github.com/engineer-man/piston.git
```

---

## 3. Start the Compiler

Go to the compiler configuration folder.

```bash
cd compiler
docker compose up -d
```

---

## 4. Install Required Language Runtimes

Open another terminal.

```bash
cd piston/cli
```

Install runtimes:

```bash
node index.js ppman install node
node index.js ppman install python
node index.js ppman install java
node index.js ppman install gcc
```

---

## 5. Verify Installed Languages

```
GET http://localhost:2000/api/v2/runtimes
```

If everything is configured correctly, the API should return installed languages such as:

- JavaScript
- Python
- Java
- C
- C++

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Docker
- Piston Compiler

## Frontend
- React.js
- Tailwind CSS
- Monaco Editor

---

# Completed Modules

- JWT Authentication
- Role-Based Authorization
- Assessment Management
- Question Management
- Submission Management
- Attempt Management
- Self-Hosted Compiler Integration
- Local Code Execution API

---

# Upcoming Features

- Hidden Test Case Evaluation
- Automatic Scoring
- Leaderboard
- Student Analytics
- AI Monitoring
- Tab Switch Detection
- Copy/Paste Detection
- Full Screen Detection
- Face Detection
- Mobile Detection
- Integrity Score

---

# Developed By

CodeGuru Development by Badal Saxena & Team

# CRM Sales System

![Dashboard Preview](./screenshots/dashboard.png)

🌐 **Live Demo:** https://crm-sales-system-client.onrender.com  
📦 **Repository:** https://github.com/Mohamedt19/crm-sales-system

---

## Demo Accounts

**Account 1**  
Email: mohamed@example.com  
Password: 123456

**Account 2**  
Email: sara@example.com  
Password: 123456

---

CRM Sales System is a full‑stack customer relationship management application built with **React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Prisma ORM, PostgreSQL, JWT authentication, Zod validation, and dnd‑kit**.

It is designed as a **sales‑focused business platform** for managing leads, companies, deal stages, notes, and pipeline movement through a SaaS‑style dashboard.

---

# Overview

CRM Sales System is a lightweight sales pipeline application where users manage leads, companies, deal stages, and notes through a clean operational dashboard.

This project demonstrates real-world full‑stack engineering patterns including:

- authenticated user flows
- protected frontend routes
- relational data modeling
- dashboard analytics
- CRUD workflows
- kanban‑style pipeline management
- drag‑and‑drop state updates
- modern React + TypeScript architecture

---

# Features

## Authentication
- User registration
- User login
- JWT-based authentication
- Protected frontend routes

## Lead Management
- Create leads
- Edit leads
- Delete leads
- Lead search by name or email
- Filter leads by stage
- Lead‑company relationships

## Lead Notes
- Add notes to leads
- View historical notes
- Maintain communication context

## Companies
- Create companies
- View companies list
- Track leads per company
- Delete companies

## Sales Pipeline
- Kanban-style board
- Leads grouped by stage
- Drag-and-drop stage updates
- Pipeline stage transitions

## Dashboard
Shows operational sales metrics:

- Total leads
- New leads
- Qualified leads
- Won deals
- Lost deals
- Total pipeline value

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- dnd‑kit

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation

---

# Project Structure

```text
crm-sales-system/
├── client/
│   ├── src/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── types/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   ├── routes/
│   │   ├── services/
│   │   └── validators/
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── leads.png
│   ├── lead-details.png
│   ├── edit-lead.png
│   ├── companies.png
│   └── pipeline.png
│
└── README.md
```

---

# Pages

- Login
- Register
- Dashboard
- Leads
- Lead Details
- Edit Lead
- Companies
- Pipeline

---

# Example Workflows

## Dashboard

Displays aggregated CRM metrics:

- total leads
- leads by stage
- deal outcomes
- pipeline value overview

This allows quick visibility into overall sales performance.

## Leads

Users can:

- create leads
- edit lead information
- assign companies
- search by name or email
- filter leads by stage
- open lead details
- delete leads

## Lead Details

Detailed lead page allows:

- viewing full lead information
- viewing associated company
- updating opportunity value
- updating lead stage
- adding notes
- reviewing lead activity notes

## Companies

Users can:

- create companies
- view company list
- track number of leads per company
- delete companies

## Pipeline

Kanban pipeline allows:

- viewing leads grouped by stage
- dragging leads between columns
- updating stage via drag‑and‑drop
- opening leads directly from the board

---

# Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Mohamedt19/crm-sales-system.git
cd crm-sales-system
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server`:

```env
PORT=3000
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/crm_sales_system"
JWT_SECRET="super_secret_change_me"
CLIENT_URL="http://localhost:5173"
```

Run database migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Optional: seed demo data

```bash
npx prisma db seed
```

Start backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:3000
```

---

# Frontend Environment (Production)

Create `.env` inside `client` when deploying:

```env
VITE_API_URL=https://your-backend-url.com
```

---

# Backend Architecture

```text
routes
↓
middleware
↓
controllers
↓
services
↓
Prisma ORM
↓
PostgreSQL
```

This layered architecture separates:

- HTTP handling
- authentication and validation
- business logic
- database access

making the system easier to maintain and extend.

---

# Key Learning Areas

This project demonstrates:

- full‑stack CRUD architecture
- authentication and protected routes
- relational data modeling
- lead‑company relationships
- dashboard aggregation
- drag‑and‑drop interactions
- kanban‑style UI patterns
- modern React + TypeScript architecture

---

# Screenshots

### Login
![Login](./screenshots/login.png)

### Register
![Register](./screenshots/register.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Leads
![Leads](./screenshots/leads.png)

### Lead Details
![Lead Details](./screenshots/lead-details.png)

### Edit Lead
![Edit Lead](./screenshots/edit-lead.png)

### Companies
![Companies](./screenshots/companies.png)

### Pipeline
![Pipeline](./screenshots/pipeline.png)

---

# Future Improvements

- lead activity timeline
- task reminders
- sales owner assignment
- role‑based access control
- analytics charts
- pagination
- mobile responsiveness improvements

---

# Author

**Mohamed Tfagha**  
GitHub: https://github.com/Mohamedt19
LinkedIn: https://www.linkedin.com/in/mohamed-tfagha-b4a460147/

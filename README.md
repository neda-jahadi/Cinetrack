# CineTrack

CineTrack is a full-stack job search application built with **React, TypeScript, Node.js, Express, Prisma, and PostgreSQL**.

The project is designed as a production-style application where users can search and filter jobs, manage authentication and profile information, and interact with a responsive and accessible user interface.

> 🚧 **Status:** This project is currently under active development.

## ✨ Features

- Search jobs by title with debounced search
- Filter jobs by region and municipality
- Filter by job type, including full-time and part-time
- Filter by work mode: remote, hybrid, and onsite
- URL-based search and filter state
- Pagination for job listings
- User authentication and protected functionality
- User profile management
- Form validation and accessible error handling
- Responsive user interface
- Reusable UI components and design-system patterns
- REST API integration between frontend and backend

## 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- React Hook Form
- Zod
- Tailwind CSS
- Storybook
- Lucide React

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- REST APIs
- JWT authentication

### Testing & Development

- Vitest
- Playwright
- ESLint
- Prettier
- Husky
- Storybook

## 🏗 Architecture

CineTrack is organized as a full-stack application with separate frontend and backend codebases:

```text
cinetrack/
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express backend
├── .husky/          # Git hooks and pre-commit checks
├── .vscode/         # Shared VS Code configuration
├── package.json     # Root development tooling
└── README.md
```

The frontend communicates with the backend through REST APIs.

```text
React / TypeScript
        ↓
    REST API
        ↓
Node.js / Express
        ↓
      Prisma
        ↓
   PostgreSQL
```

## 🎨 Frontend

The frontend is built around reusable components and consistent UI patterns.

Some of the reusable components developed for the project include:

- Input
- SearchInput
- Autocomplete
- MultiSelect
- Pagination
- Button and ButtonGroup
- ButtonLink
- Drawer
- Form components and validation states

Accessibility, responsive design, reusable styling, keyboard interaction, and consistent focus and error states are considered throughout the UI implementation.

## 🔎 Job Search & Filtering

The job search experience supports multiple filters, including:

- Job title
- Region
- Municipality
- Job type
- Work mode

Filter state is synchronized with URL search parameters, allowing searches to be preserved when navigating or sharing URLs.

Job-title searches use debouncing to avoid unnecessary API requests while the user is typing.

Server data is managed with **TanStack React Query**, providing structured data fetching, caching, and synchronization with the backend API.

## 📝 Forms & Validation

Forms are implemented using **React Hook Form** together with **Zod** for schema-based validation.

Reusable form and field components provide:

- Consistent labels
- Required-field indicators
- Validation messages
- Invalid states
- Accessible error associations

## 🔐 Authentication

The application includes JWT-based authentication backed by the Node.js/Express API.

Protected functionality and profile data are handled through authenticated API requests, with user-related information retrieved from the backend.

## 🗄 Data Layer

The backend uses **Prisma ORM** to interact with a **PostgreSQL** relational database.

The API layer separates frontend concerns from database access and provides REST endpoints consumed by the React application.

## 🧩 Component Development

Reusable UI components are developed and documented with **Storybook**, helping maintain consistency and allowing components to be developed and tested independently.

## ✅ Code Quality

The project uses automated development checks to maintain consistent code quality:

- ESLint for static analysis
- Prettier for formatting
- Husky for Git pre-commit hooks
- TypeScript for type safety
- Vitest and Playwright for testing

Pre-commit checks help catch linting and formatting issues before changes are committed.

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/neda-jahadi/Cinetrack.git
cd Cinetrack
```

### 2. Install root development dependencies

The root package contains development tooling such as Husky.

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

From the project root:

```bash
cd server
npm install
```

### 5. Configure environment variables

The project includes `.env.example` files for both the client and server.

Create a `.env` file inside `client` based on:

```text
client/.env.example
```

Create another `.env` file inside `server` based on:

```text
server/.env.example
```

The client configuration includes the backend API URL.

The server configuration requires your own PostgreSQL database connection and authentication secrets.

> 🔒 Never commit `.env` files, database credentials, or authentication secrets to the repository.

### 6. Set up the database

Make sure PostgreSQL is running and `DATABASE_URL` in `server/.env` points to your database.

From the `server` directory, generate the Prisma client:

```bash
npx prisma generate
```

Then apply the existing Prisma migrations:

```bash
npx prisma migrate dev
```

### 7. Start the backend

From the `server` directory:

```bash
npm run dev
```

### 8. Start the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 📌 Current Development

CineTrack is actively being developed. Current work includes expanding profile functionality, improving application features, testing, and preparing the application for deployment.

A live demo will be added once the application is deployed.

## 👩‍💻 Author

**Neda Jahadi**

Frontend Developer with professional experience building React applications and an interest in modern frontend architecture, accessible UI development, and full-stack web applications.

- https://www.linkedin.com/in/neda-jahadi-38917117a/
- https://github.com/neda-jahadi

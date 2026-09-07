# Fluent Path

A language-learning platform designed for educational institutions, providing structured learning content, quizzes, personalized learning experiences, and video-based lessons.

## Overview

Fluent Path is a full-stack language-learning platform built for educational institutions. The platform allows students to access lessons, learning plans, videos, quizzes, and assessments through a structured learning environment.

The project was developed using a modern web stack, with a strong focus on RESTful APIs, authentication, data management, file storage, caching, and maintainable backend architecture.

## My Role

**Backend Developer**

I was primarily responsible for Backend development, working with **Node.js, TypeScript, PostgreSQL, Redis, Prisma, and AWS S3**.

My work included designing and implementing REST APIs, authentication and authorization, video upload functionality, learning-related endpoints, quiz functionality, validation, caching, and password-reset functionality.

## Key Responsibilities

* Developed RESTful APIs using **Node.js, Express, and TypeScript**
* Implemented authentication using **JWT**
* Implemented authorization and role-based access control
* Developed password-reset functionality using one-time tokens
* Built APIs for lessons, quizzes, learning plans, and student-related functionality
* Implemented video upload functionality using **Multer and AWS S3**
* Implemented request validation using **Joi**
* Used **Prisma ORM** for database access
* Worked with **PostgreSQL** for persistent data storage
* Implemented **Redis caching** for frequently accessed data
* Worked with layered backend architecture using Controllers, Services, and Repositories
* Handled API errors and backend validation
* Worked with Git and GitHub in a collaborative development environment

## Main Features

### Authentication & Authorization

* User login
* JWT-based authentication
* Access and refresh tokens
* Role-based authorization
* Password reset using secure one-time tokens

### Lessons

* Lesson management
* Lesson validation
* Student lesson access
* Video integration
* Learning objectives and lesson metadata

### Video Uploads

Videos are uploaded through the backend and stored using **AWS S3**.

The backend handles:

* File upload processing
* File validation
* Uploading files to S3
* Storing relevant file metadata
* Returning accessible file references through the API

### Quizzes & Assessments

The platform includes APIs for managing quizzes and questions, as well as functionality related to student assessments and quiz results.

### Caching

**Redis** is used to cache frequently requested data and reduce unnecessary database queries.

Examples include cached lists such as:

* Levels
* Lessons
* Categories

### Validation

API requests are validated using **Joi schemas** to ensure that incoming data matches the expected structure and requirements.

## Technology Stack

### Backend

* Node.js
* Express.js
* TypeScript
* REST API

### Database

* PostgreSQL
* Prisma ORM

### Caching

* Redis
* ioredis

### Authentication & Security

* JSON Web Tokens (JWT)
* bcrypt
* Role-based authorization
* Request validation with Joi

### File Storage

* AWS S3
* Multer

### Development Tools

* Git
* GitHub
* Docker
* npm

## Backend Architecture

The backend follows a layered architecture that separates responsibilities between different parts of the application.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL / Redis / AWS S3
```

### Controllers

Handle incoming HTTP requests and return appropriate responses.

### Services

Contain the application's business logic and coordinate operations between different components.

### Repositories

Handle database-related operations through Prisma.

This separation helps keep the codebase organized and makes individual components easier to maintain and extend.

## API Structure

The project uses versioned REST API endpoints:

```text
/api/v1/
```

Examples:

```text
/api/v1/auth
/api/v1/lessons
/api/v1/quizzes
/api/v1/placement-test
```

## Environment Variables

The application uses environment variables for configuration and sensitive values.

Create a `.env` file in the project root based on the required environment variables.

Example:

```env
DATABASE_URL=your_database_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

FRONTEND_URL=http://localhost:3000

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

> **Important:** Never commit the `.env` file or real credentials, API keys, passwords, or secrets to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/MiriBendov/FluentPath-Backend.git
```

Navigate to the project:

```bash
cd FluentPath-Backend
```

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Create your `.env` file and configure the required environment variables.

## Running the Project

Start the development server:

```bash
npm run dev
```

The API will be available locally according to the configured server port.

## Project Structure

A simplified structure of the backend:

```text
src/
├── controllers/
├── routes/
├── services/
├── repositories/
├── middleware/
├── utils/
│   └── validation/
├── config/
└── app.ts
```

The exact structure may evolve as the project develops.

## Development Practices

During development, the project followed practices such as:

* Feature-based Git branches
* Pull requests
* Code reviews
* API versioning
* Input validation
* Separation of business logic and data access
* Environment-based configuration
* Error handling and logging
* Database migrations through Prisma

## What I Learned

Working on Fluent Path gave me practical experience in building backend systems as part of a collaborative development environment.

The project strengthened my experience with:

* Backend API development
* Authentication and authorization
* Database design and ORM usage
* Redis caching
* File storage with AWS S3
* API validation
* Backend architecture
* Git workflows and collaborative development
* Debugging and resolving merge conflicts

## Future Improvements

If I were to continue developing the project, I would invest more time in defining the Backend–Frontend contract and architecture at an early stage.

A clearer API contract and more structured separation between the Backend and Frontend would make the system easier to maintain, test, and extend as additional features are added.

## Project Status

This project was developed as a collaborative practical development project and demonstrates my hands-on experience in Backend development with Node.js and TypeScript.

## Author

**Miri Ben Dov**

Software Developer | Backend & Full Stack Development

GitHub: [MiriBendov](https://github.com/MiriBendov)

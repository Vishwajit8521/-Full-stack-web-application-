# Task Management Application with Google Gemini API

This is a full-stack web application that leverages the Google Gemini API to generate and manage tasks. Users can sign up, generate tasks based on topics, and manage their tasks with CRUD operations. The application provides a clean, intuitive interface for task management with real-time updates and progress tracking.

## Project Structure

```
/
├── backend/               # Express.js backend with Drizzle ORM
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models using Drizzle
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── index.ts       # Entry point
│   ├── drizzle/           # Drizzle migrations
│   ├── Dockerfile         # Docker configuration for backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── lib/           # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## Features

- User authentication with Clerk.com
- Task generation using Google Gemini API
- CRUD operations for tasks
- Task completion status tracking
- Progress visualization
- Responsive UI with ShadCN and Tailwind CSS

## Tech Stack

### Backend
- Express.js with TypeScript
- PostgreSQL database
- Drizzle ORM for database operations
- Docker for containerization
- Swagger for API documentation

### Frontend
- Next.js (v14.5+)
- React
- Tailwind CSS
- ShadCN UI components
- Clerk.com for authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Google AI Studio API key
- Clerk.com account

### Installation

1. Clone the repository
2. Set up environment variables (see `.env.example` files in both frontend and backend directories)
3. Run the application using Docker Compose:

```bash
docker-compose up
```

4. Access the application at http://localhost:3000

## API Documentation

API documentation is available at http://localhost:8000/api-docs when the backend is running.

## Deployment

- Backend: Deployed on Render.com
- Frontend: Deployed on Netlify

## License

MIT
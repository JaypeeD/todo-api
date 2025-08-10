# LawAdvisor Todo API

A Node.js and Express backend API built with TypeScript for managing tasks and todo lists.

## Features

- 🔒 **Authentication** - JWT-based authentication
- 📝 **Task Management** - Create, update, and manage tasks
- 📋 **Todo Lists** - Add tasks to todo lists with gap-based reordering
- 🗄️ **Database** - MySQL with Knex.js

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- MySQL database

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lawadvisor-todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables and start:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Tasks
- `GET /users/:userId/tasks` - Get all tasks for a user
- `POST /users/:userId/tasks` - Create a new task
- `PUT /users/:userId/tasks/:taskId` - Update a task

### Todo Lists
- `GET /users/:userId/todo-tasks` - Get all tasks in user's todo list
- `POST /users/:userId/todo-tasks` - Add a task to todo list
- `PUT /users/:userId/todo-tasks/reorder` - Reorder tasks in todo list
- `DELETE /users/:userId/todo-tasks/:taskId` - Remove task from todo list

## Environment Variables

- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `MYSQL_HOST` - MySQL host
- `MYSQL_DATABASE` - Database name
- `MYSQL_USER` - Database username
- `MYSQL_PASSWORD` - Database password
- `TASK_POSITION_GAP` - Gap between task positions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## License

MIT 
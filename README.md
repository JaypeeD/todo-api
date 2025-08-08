# LawAdvisor Todo API

A Node.js and Express backend API built with TypeScript for managing todo items.

## Features

- 🚀 **TypeScript** - Full TypeScript support with strict type checking
- 🔒 **Security** - Helmet.js for security headers
- 📝 **Logging** - Morgan for HTTP request logging
- 🌐 **CORS** - Cross-origin resource sharing enabled
- 🧪 **Testing** - Jest testing framework setup
- 📏 **Linting** - ESLint with TypeScript rules
- 🔄 **Hot Reload** - Nodemon for development

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

4. Build the project:
```bash
npm run build
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## API Endpoints

### Health Check
- `GET /health` - Check server health

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Example Requests

#### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, bread, eggs"
  }'
```

#### Get All Todos
```bash
curl http://localhost:3000/api/todos
```

#### Update a Todo
```bash
curl -X PUT http://localhost:3000/api/todos/1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

## Project Structure

```
src/
├── server.ts          # Main server file
├── routes/
│   └── todos.ts      # Todo routes
└── types/
    └── index.ts      # TypeScript interfaces
```

## Environment Variables

Copy `env.example` to `.env` and configure:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT 
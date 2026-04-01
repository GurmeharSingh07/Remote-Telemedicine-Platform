# Node.js Backend with MVP Architecture and Authentication

A production-ready Node.js backend API with Model-View-Presenter (MVP) architecture and JWT authentication.

## Features

- **MVP Architecture**: Clean separation between Models, Presenters (business logic), and Routes (views)
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Secure password storage with bcrypt
- **Input Validation**: Request validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **MongoDB Integration**: Database connectivity using Mongoose ODM

## Project Structure

```
├── src/
│   ├── app.js                 # Main application entry point
│   ├── config/
│   │   └── index.js           # Configuration management
│   ├── database/
│   │   └── connection.js       # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validate.js        # Validation middleware
│   ├── models/
│   │   └── User.js            # User model (Model layer)
│   ├── presenters/
│   │   └── AuthPresenter.js   # Auth business logic (Presenter layer)
│   └── routes/
│       └── authRoutes.js      # Auth API routes (View layer)
├── .env                       # Environment variables
└── package.json
```

## MVP Architecture

- **Model**: Database schemas and data structures (User model)
- **View**: API routes handling HTTP requests/responses (authRoutes.js)
- **Presenter**: Business logic and data manipulation (AuthPresenter.js)

## API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Protected Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/profile` | Get current user profile |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check server status |

## Usage

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)

```bash
GET /api/auth/profile
Authorization: Bearer <your_jwt_token>
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/auth_mvp
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MongoDB is running

3. Start the server:
   ```bash
   npm start
   ```

4. For development with auto-reload:
   ```bash
   npm run dev
   ```

## License

MIT

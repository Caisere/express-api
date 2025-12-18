# Express Movie Watchlist API

A robust RESTful API built with Express.js and Prisma ORM for managing movies and user watchlists. This API allows users to register, authenticate, browse movies, and maintain personalized watchlists with different viewing statuses.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Movie Management**: Browse and retrieve movie information
- **Watchlist Management**: Add movies to personal watchlists with status tracking
- **Multiple Watchlist States**: Track movies as PLANNED, WATCHING, COMPLETED, or DROPPED
- **Rating & Notes**: Add personal ratings and notes to watchlist items
- **Database Relationships**: Properly structured relational database with Prisma ORM
- **Error Handling**: Comprehensive error handling and validation
- **Security**: HTTP-only cookies, secure token handling, and password encryption

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL
- **ORM**: Prisma 6.8.0
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Development**: Nodemon for hot-reloading

## 📁 Project Structure

```
express-api/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.js             # Database seeding script
├── src/
│   ├── config/
│   │   └── db.js           # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── moviesController.js    # Movie operations
│   │   ├── usersController.js     # User management
│   │   └── watchlistController.js # Watchlist operations
│   ├── routes/
│   │   ├── authRoute.js           # Authentication routes
│   │   ├── movieRoute.js          # Movie routes
│   │   ├── usersRoute.js          # User routes
│   │   └── watchlistRoute.js      # Watchlist routes
│   ├── utils/
│   │   └── generateToken.js       # JWT token generation
│   └── server.js                  # Application entry point
├── package.json
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd express-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables (see [Environment Variables](#environment-variables) section for details):

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

## 🔐 Environment Variables

| Variable         | Description                                      | Required | Default       |
| ---------------- | ------------------------------------------------ | -------- | ------------- |
| `DATABASE_URL`   | PostgreSQL connection string                     | Yes      | -             |
| `JWT_SECRET`     | Secret key for JWT token generation              | Yes      | -             |
| `JWT_EXPIRES_IN` | JWT token expiration time                        | No       | `7d`          |
| `NODE_ENV`       | Environment mode (`development` or `production`) | No       | `development` |

### Example Configuration

```env
# Database
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/movies_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Environment
NODE_ENV="development"
```

## 🗄 Database Setup

1. **Generate Prisma Client**

```bash
npx prisma generate
```

2. **Run database migrations**

```bash
npx prisma migrate dev
```

3. **Seed the database** (optional - adds sample movie data)

```bash
npm run seed:movies
```

4. **View your database** (optional - opens Prisma Studio)

```bash
npx prisma studio
```

## ▶️ Running the Application

### Development Mode (with hot-reload)

```bash
npm run dev
```

The server will start on `http://localhost:3005`

### Production Mode

```bash
node src/server.js
```

## 📚 API Documentation

### Base URL

```
http://localhost:3005
```

### Authentication Endpoints

#### Register a New User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "success": "User Successful Created",
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "success": "user successfully logged in",
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Logout

```http
POST /auth/logout
```

**Response:**

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

### Movie Endpoints

#### Get All Movies

```http
GET /movies
```

**Response:**

```json
{
  "message": "success",
  "movies": [
    {
      "id": "uuid-here",
      "title": "Inception",
      "overview": "A thief who steals corporate secrets...",
      "releaseYear": 2010,
      "genres": ["Action", "Sci-Fi", "Thriller"],
      "runtime": 148,
      "posterUrl": "https://example.com/poster.jpg",
      "createdBy": "user-uuid",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Watchlist Endpoints

#### Add Movie to Watchlist

```http
POST /watchlist
Content-Type: application/json

{
  "userId": "user-uuid-here",
  "movieId": "movie-uuid-here",
  "status": "PLANNED",
  "rating": 5,
  "note": "Must watch this weekend!"
}
```

**Status Options:**

- `PLANNED` - Planning to watch
- `WATCHING` - Currently watching
- `COMPLETED` - Finished watching
- `DROPPED` - Stopped watching

**Response:**

```json
{
  "message": "Movie successfully added!",
  "data": {
    "id": "watchlist-uuid",
    "userId": "user-uuid",
    "movieId": "movie-uuid",
    "status": "PLANNED",
    "rating": 5,
    "note": "Must watch this weekend!",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### User Endpoints

```http
GET /users
```

_(Check `src/routes/usersRoute.js` for available user endpoints)_

### Root Endpoint

```http
GET /
```

**Response:**

```json
{
  "message": "This is the home page"
}
```

## 🗃 Database Schema

### User Model

| Field    | Type          | Constraints       |
| -------- | ------------- | ----------------- |
| id       | String (UUID) | Primary Key       |
| name     | String        | Required          |
| email    | String        | Unique, Required  |
| password | String        | Required (Hashed) |
| createAt | DateTime      | Default: now()    |

### Movie Model

| Field       | Type          | Constraints        |
| ----------- | ------------- | ------------------ |
| id          | String (UUID) | Primary Key        |
| title       | String        | Required           |
| overview    | String        | Optional           |
| releaseYear | Int           | Required           |
| genres      | String[]      | Default: []        |
| runtime     | Int           | Optional           |
| posterUrl   | String        | Optional           |
| createdBy   | String        | Foreign Key → User |
| createdAt   | DateTime      | Default: now()     |

### WatchlistItem Model

| Field     | Type           | Constraints         |
| --------- | -------------- | ------------------- |
| id        | String (UUID)  | Primary Key         |
| userId    | String         | Foreign Key → User  |
| movieId   | String         | Foreign Key → Movie |
| status    | WashlistStatus | Default: PLANNED    |
| rating    | Int            | Optional (1-5)      |
| note      | String         | Optional            |
| createdAt | DateTime       | Default: now()      |
| updatedAt | DateTime       | Default: now()      |

**Unique Constraint:** A user cannot add the same movie twice (`userId` + `movieId`)

### Relationships

- **User → Movies**: One-to-Many (A user can create many movies)
- **User → WatchlistItems**: One-to-Many (A user can have many watchlist items)
- **Movie → WatchlistItems**: One-to-Many (A movie can be in many watchlists)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
- **CSRF Protection**: SameSite cookie attribute set to 'strict'
- **Environment-based Security**: Different security settings for development and production
- **Input Validation**: Request body validation on all endpoints
- **Error Messages**: Sanitized error messages in production mode

## 🧪 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Seed database with sample movies
npm run seed:movies

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (Database GUI)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name migration_name
```

## 🚦 Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Invalid input or missing required fields
- **401 Unauthorized**: Invalid credentials or missing authentication
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

Error responses include detailed messages in development mode:

```json
{
  "error": "Error description",
  "message": "Detailed error message (development only)"
}
```

## 🛡️ Best Practices Implemented

- ✅ ES6 Modules for modern JavaScript
- ✅ Async/await for asynchronous operations
- ✅ Environment-based configuration
- ✅ Proper error handling and logging
- ✅ Database connection management
- ✅ Graceful shutdown handling
- ✅ RESTful API design
- ✅ Cascading deletes for data integrity
- ✅ Input validation and sanitization

## 📝 Notes

- The API uses PostgreSQL as the database. Make sure PostgreSQL is running before starting the server.
- JWT tokens are stored in HTTP-only cookies and have a default expiration of 7 days.
- The server implements graceful shutdown to properly close database connections.
- In development mode, detailed error messages are returned for easier debugging.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👨‍💻 Author

Omoshola E.

---

**Built with ❤️ using Express.js and Prisma**

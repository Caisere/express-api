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
- [Future Endpoints](#-future-endpoints)
- [Database Schema](#database-schema)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Role-Based Access Control**: User roles (User, Admin, Super_Admin) with protected routes
- **Movie Management**: Browse and retrieve movie information
- **Watchlist Management**: Add, update, and remove movies from personal watchlists with status tracking
- **Multiple Watchlist States**: Track movies as PLANNED, WATCHING, COMPLETED, or DROPPED
- **Rating & Notes**: Add personal ratings (1-10) and notes to watchlist items
- **Database Relationships**: Properly structured relational database with Prisma ORM
- **Request Validation**: Zod schema validation for request bodies
- **Error Handling**: Comprehensive error handling and validation
- **Security**: HTTP-only cookies, secure token handling, and password encryption

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL (NEON)
- **ORM**: Prisma 6.8.0
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Zod schema validation
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
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication middleware
│   │   ├── requireRole.js         # Role-based access control
│   │   └── validateRequest.js     # Request validation middleware
│   ├── routes/
│   │   ├── authRoute.js           # Authentication routes
│   │   ├── movieRoute.js          # Movie routes
│   │   ├── usersRoute.js          # User routes
│   │   └── watchlistRoute.js      # Watchlist routes
│   ├── utils/
│   │   └── generateToken.js       # JWT token generation
│   ├── validators/
│   │   ├── authValidation.js      # Auth request validators
│   │   ├── envValidation.js       # Environment variable validation
│   │   └── watchlistValidator.js  # Watchlist request validators
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
      "email": "john@example.com",
      "role": "User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** The response includes the user's role (User, Admin, or Super_Admin) which is used for role-based access control.

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

#### Create Movie

```http
POST /movies
Content-Type: application/json

{
  "title": "Inception",
  "overview": "A thief who steals corporate secrets...",
  "releaseYear": 2010,
  "genres": ["Action", "Sci-Fi"],
  "runtime": 148,
  "posterUrl": "https://example.com/poster.jpg"
}
```

**Note:** This endpoint currently returns the request body. Full implementation with database persistence is pending.

### Watchlist Endpoints

#### Add Movie to Watchlist

```http
POST /watchlist
Content-Type: application/json
Authorization: Bearer <token>

{
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

**Note:** `userId` is automatically extracted from the authenticated user's token. `status`, `rating`, and `note` are optional fields. Rating must be an integer between 1 and 10.

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

#### Update Watchlist Item

```http
PUT /watchlist/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "COMPLETED",
  "rating": 9,
  "note": "Amazing movie! Highly recommend."
}
```

Update the status, rating, or note of a watchlist item. All fields are optional - only include the fields you want to update.

**Response:**

```json
{
  "status": "success",
  "data": {
    "watchlistItem": {
      "id": "watchlist-uuid",
      "userId": "user-uuid",
      "movieId": "movie-uuid",
      "status": "COMPLETED",
      "rating": 9,
      "note": "Amazing movie! Highly recommend.",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  }
}
```

#### Remove Movie from Watchlist

```http
DELETE /watchlist/:id
Authorization: Bearer <token>
```

Remove a movie from the authenticated user's watchlist. Only the owner of the watchlist item can delete it.

**Response:**

```json
{
  "status": "success",
  "message": "Movie removed from watchlist"
}
```

### User Endpoints

**Note:** All user endpoints require authentication and are restricted to Admin and Super_Admin roles only.

#### Get All Users

```http
GET /users
Authorization: Bearer <token>
```

Retrieve a list of all registered users (excluding sensitive information like passwords). Requires Admin or Super_Admin role.

**Response:**

```json
{
  "message": "All valid users",
  "allValidUsers": [
    {
      "id": "user-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### Get Individual User

```http
GET /users/:id
Authorization: Bearer <token>
```

Retrieve detailed information about a specific user by their ID. Requires Admin or Super_Admin role.

**Response:**

```json
{
  "message": "User found for user-id: user-uuid",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Delete User Account

```http
DELETE /users/:id
Authorization: Bearer <token>
```

Delete a user account and all associated data. This action is irreversible and requires Admin or Super_Admin role.

**Response:**

```json
{
  "status": "success",
  "message": "User Successfully Deleted",
  "performedBy": "Admin Name"
}
```

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

## 🔮 Future Endpoints

The following endpoints are planned for future implementation and are open for collaboration:

### Watchlist Endpoints

#### Get User's Watchlist

```http
GET /watchlist
```

Retrieve all watchlist items for the authenticated user.

#### Get Specific Watchlist Item

```http
GET /watchlist/:id
```

Retrieve a specific watchlist item by its ID.

### Movie Endpoints

#### Get Single Movie

```http
GET /movies/:id
```

Retrieve detailed information about a specific movie by its ID.

### User Endpoints

#### Update User Profile

```http
PATCH /users/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

Update user profile information (name, email, etc.).

---

**Note:** The remaining endpoints listed above are not yet implemented. Contributions are welcome! Please refer to the [Contributing](#-contributing) section for guidelines.

## 🗃 Database Schema

### User Model

| Field     | Type          | Constraints          |
| --------- | ------------- | -------------------- |
| id        | String (UUID) | Primary Key          |
| name      | String        | Required             |
| email     | String        | Unique, Required     |
| password  | String        | Required (Hashed)    |
| role      | UserRole      | Default: User (enum) |
| createdAt | DateTime      | Default: now()       |

**UserRole Enum:**

- `User` - Default role for regular users
- `Admin` - Administrative access
- `Super_Admin` - Full system access

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

| Field     | Type            | Constraints         |
| --------- | --------------- | ------------------- |
| id        | String (UUID)   | Primary Key         |
| userId    | String          | Foreign Key → User  |
| movieId   | String          | Foreign Key → Movie |
| status    | WatchlistStatus | Default: PLANNED    |
| rating    | Int             | Optional (1-10)     |
| note      | String          | Optional            |
| createdAt | DateTime        | Default: now()      |
| updatedAt | DateTime        | Default: now()      |

**Unique Constraint:** A user cannot add the same movie twice (`userId` + `movieId`)

### Relationships

- **User → Movies**: One-to-Many (A user can create many movies)
- **User → WatchlistItems**: One-to-Many (A user can have many watchlist items)
- **Movie → WatchlistItems**: One-to-Many (A movie can be in many watchlists)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: User roles (User, Admin, Super_Admin) with protected routes
- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
- **CSRF Protection**: SameSite cookie attribute set to 'strict'
- **Environment-based Security**: Different security settings for development and production
- **Input Validation**: Request body validation using Zod schemas on all endpoints
- **Error Messages**: Sanitized error messages in production mode
- **Authorization Middleware**: Role-based access control via `requireRole` middleware

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

# Healio Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## MongoDB Connection

The MongoDB connection string is configured in `database.js`. The server will automatically connect to MongoDB Atlas on startup.

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users (`/api/users`)
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Doctors (`/api/doctors`)
- `GET /api/doctors` - Get all doctors (Public)
- `GET /api/doctors/:id` - Get single doctor (Public)
- `POST /api/doctors/profile` - Create doctor profile (Protected)

### Appointments (`/api/appointments`)
- `POST /api/appointments` - Create appointment (Protected)
- `GET /api/appointments/my-appointments` - Get user's appointments (Protected)
- `GET /api/appointments/:id` - Get single appointment (Protected)
- `PUT /api/appointments/:id/status` - Update appointment status (Protected)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (Protected)

### Wellness Tracker (`/api/wellness`)
- `POST /api/wellness` - Add wellness entry (Protected)
- `GET /api/wellness` - Get wellness entries (Protected)
- `GET /api/wellness/stats` - Get wellness statistics (Protected)

## Models

- **User**: Patient and doctor user accounts
- **Doctor**: Doctor profiles and details
- **Appointment**: Patient appointments with doctors
- **WellnessTracker**: Patient wellness tracking entries

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Port

Default port: 5000
Can be changed using the `PORT` environment variable.





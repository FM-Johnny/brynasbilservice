# Admin Panel Documentation

## Overview

The admin panel provides authorized users with the ability to manage bookings and services for Brynäs Bilservice. It includes features for viewing, editing, and deleting bookings, as well as managing the services offered by the company.

## Accessing the Admin Panel

To access the admin panel, navigate to `/admin/login` in your browser. Use the following credentials to log in:

- Username: `admin`
- Password: `admin123`

*Note: In a production environment, these credentials should be changed and stored securely.*

## Features

### Booking Management

The booking management section allows administrators to:

- View all bookings in a table format
- Search bookings by customer name or service
- Filter bookings by status (Pending, Confirmed, Completed, Cancelled)
- Update booking status using the dropdown menu
- Delete bookings using the delete button

Each booking displays the following information:

- Customer name
- Service requested
- Date and time of booking
- Current status
- Actions (update status, delete)

### Service Management

The service management section allows administrators to:

- View all services offered
- Search services by name or description
- Add new services
- Edit existing services
- Delete services

Each service displays the following information:

- Service name
- Description
- Price in SEK
- Actions (edit, delete)

When adding or editing a service, administrators can specify:

- Service name
- Description
- Price in SEK

## Security

The admin panel implements the following security measures:

- Authentication is required to access any admin pages
- API requests to admin endpoints require a valid authorization token
- Sessions are managed through localStorage
- Logout functionality clears authentication tokens

## Technical Implementation

The admin panel is built using React with TypeScript and styled with Tailwind CSS. It communicates with the backend server through RESTful API endpoints.

### Authentication Flow

1. User navigates to `/admin/login`
2. User enters credentials and submits the form
3. Credentials are verified (currently using a simple check, but in production this would be implemented server-side)
4. Upon successful authentication, an admin token is stored in localStorage
5. User is redirected to `/admin/dashboard`
6. All subsequent API requests include the authorization token in the header

### Protected Routes

The admin dashboard and its components are protected by a ProtectedRoute component that checks for:

- Presence of `isAdminLoggedIn` in localStorage
- Valid `adminToken` in localStorage

If either of these conditions is not met, the user is redirected to the login page.

### API Endpoints

The admin panel communicates with the following API endpoints:

#### Bookings

- `GET /api/admin/bookings` - Retrieve all bookings
- `PUT /api/admin/bookings/:id` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete a booking

#### Services

- `GET /api/admin/services` - Retrieve all services
- `POST /api/admin/services` - Create a new service
- `PUT /api/admin/services/:id` - Update an existing service
- `DELETE /api/admin/services/:id` - Delete a service

All admin API endpoints require an authorization header with a bearer token.

## Future Improvements

Potential enhancements for future versions:

- Implement server-side authentication with hashed passwords
- Add user management features
- Include booking statistics and reports
- Add export functionality for bookings and services
- Implement role-based access control for different admin levels

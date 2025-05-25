# Backend Documentation

This document provides details about the data models and API endpoints for the bus management system.

## Data Models

### Bus

*   `id`: string (unique identifier)
*   `name`: string (e.g., "Bus A")
*   `capacity`: integer

### Route

*   `id`: string (unique identifier)
*   `name`: string (e.g., "Route 1")
*   `stops`: array of strings (ordered list of stop names)

### Schedule

*   `id`: string (unique identifier)
*   `bus_id`: string (links to a Bus)
*   `route_id`: string (links to a Route)
*   `departure_time`: string (ISO 8601 format)
*   `arrival_time`: string (ISO 8601 format)

## API Endpoints

### Buses

*   `GET /api/buses`: Get all buses.
*   `GET /api/buses/{id}`: Get a specific bus by ID.
*   `POST /api/buses`: Create a new bus.
*   `PUT /api/buses/{id}`: Update an existing bus.
*   `DELETE /api/buses/{id}`: Delete a bus.

### Routes

*   `GET /api/routes`: Get all routes.
*   `GET /api/routes/{id}`: Get a specific route by ID.
*   `POST /api/routes`: Create a new route.
*   `PUT /api/routes/{id}`: Update an existing route.
*   `DELETE /api/routes/{id}`: Delete a route.

### Schedules

*   `GET /api/schedules`: Get all schedules.
*   `GET /api/schedules/{id}`: Get a specific schedule by ID.
*   `POST /api/schedules`: Create a new schedule.
*   `PUT /api/schedules/{id}`: Update an existing schedule.
*   `DELETE /api/schedules/{id}`: Delete a schedule.

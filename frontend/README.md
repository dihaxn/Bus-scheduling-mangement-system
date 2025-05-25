# Frontend UI Design

This document outlines the basic UI design for the single-page bus management application.

**Overall Structure:** Single-page application.

## 1. Navigation Bar

*   Links/buttons to switch between "Manage Buses", "Manage Routes", and "Manage Schedules" views.

## 2. Manage Buses View

*   **Display:** A table or list showing existing buses.
    *   Columns: Bus Name, Capacity.
    *   Actions per bus: "Edit" button, "Delete" button.
*   **Form (for adding/editing a bus):**
    *   Input field: Bus Name (text)
    *   Input field: Capacity (number)
    *   Button: "Save Bus" / "Add Bus"

## 3. Manage Routes View

*   **Display:** A table or list showing existing routes.
    *   Columns: Route Name, Stops.
    *   Actions per route: "Edit" button, "Delete" button.
*   **Form (for adding/editing a route):**
    *   Input field: Route Name (text)
    *   Input field: Stops (text, e.g., comma-separated list like "Stop A, Stop B, Stop C")
    *   Button: "Save Route" / "Add Route"

## 4. Manage Schedules View

*   **Display:** A table or list showing existing schedules.
    *   Columns: Bus Name, Route Name, Departure Time, Arrival Time.
    *   Actions per schedule: "Edit" button, "Delete" button.
*   **Form (for adding/editing a schedule):**
    *   Dropdown: Select Bus (populated from existing buses)
    *   Dropdown: Select Route (populated from existing routes)
    *   Input field: Departure Time (datetime-local input)
    *   Input field: Arrival Time (datetime-local input)
    *   Button: "Save Schedule" / "Add Schedule"

**Note:** This is an initial design and can be expanded upon with more features and refined user experience elements.

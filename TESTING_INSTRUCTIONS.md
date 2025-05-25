# Manual Testing Instructions for Bus Management System

This document provides steps to manually test the functionality of the Bus Management System application.

## I. Setup

1.  Navigate to the `backend` directory in your terminal:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the backend server:
    ```bash
    python app.py
    ```
    The server should typically run on `http://127.0.0.1:5000/`. You will see output in your terminal indicating the server is running.

4.  Open the `frontend/index.html` file in your web browser.
    *   You can usually do this by right-clicking the file in your file explorer and choosing "Open with" your preferred browser, or by typing the file path directly into the browser's address bar (e.g., `file:///path/to/your/project/frontend/index.html`).

## II. Testing Scenarios

### A. Managing Buses

1.  **Add Bus:**
    *   The "Manage Buses" view should be active by default.
    *   In the "Add/Edit Bus" form, enter a "Bus Name" (e.g., "City Express") and "Capacity" (e.g., 50).
    *   Click the "Add Bus" button.
    *   **Expected:** The bus "City Express" with capacity 50 appears in the table below the form. The input fields in the form should clear.

2.  **Edit Bus:**
    *   Click the "Edit" button next to the "City Express" bus in the table.
    *   The "Add/Edit Bus" form should populate with "City Express" and "50". The button text should change to "Update Bus".
    *   Change the "Bus Name" to "City Express Updated" and "Capacity" to 55.
    *   Click the "Update Bus" button.
    *   **Expected:** The bus details for "City Express" in the table should update to "City Express Updated" and capacity 55. The form should clear, and the button text should revert to "Add Bus".

3.  **Delete Bus:**
    *   Click the "Delete" button next to the "City Express Updated" bus.
    *   A confirmation dialog may appear. Confirm the deletion.
    *   **Expected:** The "City Express Updated" bus is removed from the table.

### B. Managing Routes

1.  Navigate to the "Manage Routes" view by clicking the "Routes" button in the top navigation bar.

2.  **Add Route:**
    *   In the "Add/Edit Route" form, enter a "Route Name" (e.g., "Downtown Loop") and "Stops" (e.g., "Main St, Central Park, City Hall").
    *   Click the "Add Route" button.
    *   **Expected:** The route "Downtown Loop" with its stops appears in the table. The form clears.

3.  **Edit Route:**
    *   Click the "Edit" button next to the "Downtown Loop" route.
    *   The form should populate with "Downtown Loop" and its stops. The button text should change to "Update Route".
    *   Change the "Stops" to "Main St, Central Park, Museum, City Hall".
    *   Click the "Update Route" button.
    *   **Expected:** The stops for "Downtown Loop" update in the table. The form clears, and the button text reverts.

4.  **Delete Route:**
    *   Click the "Delete" button next to the "Downtown Loop" route.
    *   Confirm the deletion if prompted.
    *   **Expected:** The "Downtown Loop" route is removed from the table.

### C. Managing Schedules

1.  **Prerequisites:** Ensure you have at least one bus and one route created. If you deleted them in the previous steps, re-add one bus (e.g., "Bus Alpha", Capacity 30) and one route (e.g., "Route X", Stops "Stop 1, Stop 2").

2.  Navigate to the "Manage Schedules" view by clicking the "Schedules" button in the top navigation bar.

3.  **Add Schedule:**
    *   In the "Add/Edit Schedule" form:
        *   Select the bus you created (e.g., "Bus Alpha") from the "Select Bus" dropdown.
        *   Select the route you created (e.g., "Route X") from the "Select Route" dropdown.
        *   Choose a "Departure Time" (e.g., today's date, 10:00 AM).
        *   Choose an "Arrival Time" (e.g., today's date, 11:00 AM). Ensure arrival time is after departure time.
    *   Click the "Add Schedule" button.
    *   **Expected:** The schedule appears in the table, showing the selected bus name, route name, and the chosen departure and arrival times (formatted). The form clears.

4.  **Edit Schedule:**
    *   Click the "Edit" button next to the schedule you just created.
    *   The form should populate with the schedule's details. The button text changes to "Update Schedule".
    *   Change the "Departure Time" to a different time (e.g., 10:30 AM).
    *   Click the "Update Schedule" button.
    *   **Expected:** The schedule's departure time updates in the table. The form clears, and the button text reverts.

5.  **Delete Schedule:**
    *   Click the "Delete" button next to the schedule.
    *   Confirm the deletion if prompted.
    *   **Expected:** The schedule is removed from the table.

### D. Data Persistence (Within a Single Backend Session)

1.  After adding a few buses (e.g., Bus A, Bus B), routes (e.g., Route 1, Route 2), and schedules, refresh the `frontend/index.html` page in your web browser (usually Ctrl+R or Cmd+R).
2.  Navigate through the "Buses", "Routes", and "Schedules" views.
3.  **Expected:** All previously added data (Bus A, Bus B, Route 1, Route 2, and any schedules) should still be present and displayed correctly in their respective tables. This demonstrates that the in-memory backend retains data for the duration of the server session.

**Important Note:** This application uses an in-memory database for the backend. This means all data (buses, routes, schedules) will be lost if the `python app.py` backend server is stopped and restarted. Testing of data persistence is only valid for the current running session of the backend server.

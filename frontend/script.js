document.addEventListener('DOMContentLoaded', () => {
    // Data storage
    let buses = [];
    let routes = [];
    let schedules = [];
    let currentView = 'buses'; // Default view
    let editingBusId = null;
    let editingRouteId = null;
    let editingScheduleId = null;

    // DOM element references
    // Views
    const busesView = document.getElementById('buses-view');
    const routesView = document.getElementById('routes-view');
    const schedulesView = document.getElementById('schedules-view');

    // Navigation
    const navBusesBtn = document.getElementById('nav-buses');
    const navRoutesBtn = document.getElementById('nav-routes');
    const navSchedulesBtn = document.getElementById('nav-schedules');

    // Buses
    const busesTableBody = document.querySelector('#buses-table tbody');
    const addBusForm = document.getElementById('add-bus-form');
    const busNameInput = document.getElementById('bus-name');
    const busCapacityInput = document.getElementById('bus-capacity');
    const addBusFormButton = addBusForm.querySelector('button[type="submit"]');

    // Routes
    const routesTableBody = document.querySelector('#routes-table tbody');
    const addRouteForm = document.getElementById('add-route-form');
    const routeNameInput = document.getElementById('route-name');
    const routeStopsInput = document.getElementById('route-stops');
    const addRouteFormButton = addRouteForm.querySelector('button[type="submit"]');

    // Schedules
    const schedulesTableBody = document.querySelector('#schedules-table tbody');
    const addScheduleForm = document.getElementById('add-schedule-form');
    const scheduleBusSelect = document.getElementById('schedule-bus');
    const scheduleRouteSelect = document.getElementById('schedule-route');
    const scheduleDepartureInput = document.getElementById('schedule-departure');
    const scheduleArrivalInput = document.getElementById('schedule-arrival');
    const addScheduleFormButton = addScheduleForm.querySelector('button[type="submit"]');


    const API_URL = '/api'; // Assuming backend is served from the same origin

    // --- Render Functions ---
    function renderBuses() {
        if (!busesTableBody) return; 
        busesTableBody.innerHTML = ''; 

        buses.forEach(bus => {
            const row = document.createElement('tr');
            row.dataset.id = bus.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = bus.name;
            row.appendChild(nameCell);

            const capacityCell = document.createElement('td');
            capacityCell.textContent = bus.capacity;
            row.appendChild(capacityCell);

            const actionsCell = document.createElement('td');
            actionsCell.classList.add('actions');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.dataset.id = bus.id;
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.dataset.id = bus.id;
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            busesTableBody.appendChild(row);
        });
    }

    function renderRoutes() {
        if (!routesTableBody) return;
        routesTableBody.innerHTML = '';

        routes.forEach(route => {
            const row = document.createElement('tr');
            row.dataset.id = route.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = route.name;
            row.appendChild(nameCell);

            const stopsCell = document.createElement('td');
            stopsCell.textContent = route.stops.join(', '); // Display stops as a string
            row.appendChild(stopsCell);

            const actionsCell = document.createElement('td');
            actionsCell.classList.add('actions');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.dataset.id = route.id;
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.dataset.id = route.id;
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            routesTableBody.appendChild(row);
        });
    }

    function renderSchedules() {
        if (!schedulesTableBody) return;
        schedulesTableBody.innerHTML = '';

        schedules.forEach(schedule => {
            const row = document.createElement('tr');
            row.dataset.id = schedule.id;

            const bus = buses.find(b => b.id === schedule.bus_id);
            const route = routes.find(r => r.id === schedule.route_id);

            const busCell = document.createElement('td');
            busCell.textContent = bus ? bus.name : 'N/A';
            row.appendChild(busCell);

            const routeCell = document.createElement('td');
            routeCell.textContent = route ? route.name : 'N/A';
            row.appendChild(routeCell);

            const departureCell = document.createElement('td');
            departureCell.textContent = new Date(schedule.departure_time).toLocaleString();
            row.appendChild(departureCell);

            const arrivalCell = document.createElement('td');
            arrivalCell.textContent = new Date(schedule.arrival_time).toLocaleString();
            row.appendChild(arrivalCell);

            const actionsCell = document.createElement('td');
            actionsCell.classList.add('actions');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.dataset.id = schedule.id;
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.dataset.id = schedule.id;
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            schedulesTableBody.appendChild(row);
        });
    }


    // --- API Call Functions ---
    async function fetchBuses() {
        try {
            const response = await fetch(`${API_URL}/buses`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            buses = await response.json();
            renderBuses();
            return buses; // Return data for Promise.all
        } catch (error) {
            console.error('Error fetching buses:', error);
            // Optionally: display an error message to the user
            return []; // Return empty array on error
        }
    }

    async function fetchRoutes() {
        try {
            const response = await fetch(`${API_URL}/routes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            routes = await response.json();
            renderRoutes();
            return routes; // Return data for Promise.all
        } catch (error) {
            console.error('Error fetching routes:', error);
            return [];
        }
    }

    async function fetchSchedules() {
        try {
            const response = await fetch(`${API_URL}/schedules`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            schedules = await response.json();
            renderSchedules();
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    }

    // --- Helper Functions ---
    function populateBusAndRouteDropdowns() {
        if (!scheduleBusSelect || !scheduleRouteSelect) return;

        scheduleBusSelect.innerHTML = '<option value="">Select Bus</option>';
        buses.forEach(bus => {
            const option = document.createElement('option');
            option.value = bus.id;
            option.textContent = bus.name;
            scheduleBusSelect.appendChild(option);
        });

        scheduleRouteSelect.innerHTML = '<option value="">Select Route</option>';
        routes.forEach(route => {
            const option = document.createElement('option');
            option.value = route.id;
            option.textContent = route.name;
            scheduleRouteSelect.appendChild(option);
        });
    }


    // --- Event Listeners ---
    // Bus Form
    if (addBusForm) {
        addBusForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!busNameInput || !busCapacityInput) return;
            const name = busNameInput.value.trim();
            const capacity = parseInt(busCapacityInput.value);

            if (!name || isNaN(capacity) || capacity <= 0) {
                alert('Please enter a valid name and capacity.');
                return;
            }

            const busData = { name, capacity };
            let url = `${API_URL}/buses`;
            let method = 'POST';

            if (editingBusId) {
                url = `${API_URL}/buses/${editingBusId}`;
                method = 'PUT';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(busData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                await fetchBuses(); // Refresh the list
                addBusForm.reset();
                addBusFormButton.textContent = 'Add Bus';
                editingBusId = null;
            } catch (error) {
                console.error('Error saving bus:', error);
                alert(`Error saving bus: ${error.message}`);
            }
        });
    }

    // Route Form
    if (addRouteForm) {
        addRouteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!routeNameInput || !routeStopsInput) return;

            const name = routeNameInput.value.trim();
            const stopsRaw = routeStopsInput.value.trim();
            const stops = stopsRaw.split(',').map(s => s.trim()).filter(s => s); // Split and clean

            if (!name || stops.length === 0) {
                alert('Please enter a valid route name and at least one stop.');
                return;
            }

            const routeData = { name, stops };
            let url = `${API_URL}/routes`;
            let method = 'POST';

            if (editingRouteId) {
                url = `${API_URL}/routes/${editingRouteId}`;
                method = 'PUT';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(routeData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                await fetchRoutes(); // Refresh the list
                addRouteForm.reset();
                if (addRouteFormButton) addRouteFormButton.textContent = 'Add Route';
                editingRouteId = null;
            } catch (error) {
                console.error('Error saving route:', error);
                alert(`Error saving route: ${error.message}`);
            }
        });
    }

    // Schedule Form
    if (addScheduleForm) {
        addScheduleForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!scheduleBusSelect || !scheduleRouteSelect || !scheduleDepartureInput || !scheduleArrivalInput) return;

            const busId = scheduleBusSelect.value;
            const routeId = scheduleRouteSelect.value;
            const departureTime = scheduleDepartureInput.value;
            const arrivalTime = scheduleArrivalInput.value;

            if (!busId || !routeId || !departureTime || !arrivalTime) {
                alert('Please fill in all schedule fields.');
                return;
            }
            
            if (new Date(departureTime) >= new Date(arrivalTime)) {
                alert('Departure time must be before arrival time.');
                return;
            }

            const scheduleData = {
                bus_id: busId,
                route_id: routeId,
                departure_time: departureTime,
                arrival_time: arrivalTime
            };

            let url = `${API_URL}/schedules`;
            let method = 'POST';

            if (editingScheduleId) {
                url = `${API_URL}/schedules/${editingScheduleId}`;
                method = 'PUT';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scheduleData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                await fetchSchedules(); // Refresh the list
                addScheduleForm.reset();
                 if (addScheduleFormButton) addScheduleFormButton.textContent = 'Add Schedule';
                editingScheduleId = null;
            } catch (error) {
                console.error('Error saving schedule:', error);
                alert(`Error saving schedule: ${error.message}`);
            }
        });
    }


    // Table Action Event Listeners (Event Delegation)
    if (busesTableBody) {
        busesTableBody.addEventListener('click', (event) => handleTableActions(event, 'bus'));
    }
    if (routesTableBody) {
        routesTableBody.addEventListener('click', (event) => handleTableActions(event, 'route'));
    }
    if (schedulesTableBody) {
        schedulesTableBody.addEventListener('click', (event) => handleTableActions(event, 'schedule'));
    }

    // --- Action Handlers ---
    function handleTableActions(event, type) {
        const target = event.target;
        const itemId = target.dataset.id;

        if (!itemId) return; // Click was not on a button with data-id

        if (target.classList.contains('edit-btn')) {
            if (type === 'bus') handleEditBus(itemId);
            else if (type === 'route') handleEditRoute(itemId);
            else if (type === 'schedule') handleEditSchedule(itemId);
        } else if (target.classList.contains('delete-btn')) {
            if (type === 'bus') handleDeleteBus(itemId);
            else if (type === 'route') handleDeleteRoute(itemId);
            else if (type === 'schedule') handleDeleteSchedule(itemId);
        }
    }

    // Bus Actions
    function handleEditBus(busId) {
        editingBusId = busId;
        const busToEdit = buses.find(bus => bus.id === busId);
        if (busToEdit && busNameInput && busCapacityInput && addBusFormButton) {
            busNameInput.value = busToEdit.name;
            busCapacityInput.value = busToEdit.capacity;
            addBusFormButton.textContent = 'Update Bus';
            addBusForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    async function handleDeleteBus(busId) {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to delete this bus?')) return;
        try {
            const response = await fetch(`${API_URL}/buses/${busId}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            await fetchBuses(); // Refresh the list
        } catch (error) {
            console.error('Error deleting bus:', error);
            alert(`Error deleting bus: ${error.message}`);
        }
    }

    // Route Actions
    function handleEditRoute(routeId) {
        editingRouteId = routeId;
        const routeToEdit = routes.find(route => route.id === routeId);
        if (routeToEdit && routeNameInput && routeStopsInput && addRouteFormButton) {
            routeNameInput.value = routeToEdit.name;
            routeStopsInput.value = routeToEdit.stops.join(', ');
            addRouteFormButton.textContent = 'Update Route';
            addRouteForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    async function handleDeleteRoute(routeId) {
        if (!confirm('Are you sure you want to delete this route?')) return;
        try {
            const response = await fetch(`${API_URL}/routes/${routeId}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            await fetchRoutes(); // Refresh the list
        } catch (error) {
            console.error('Error deleting route:', error);
            alert(`Error deleting route: ${error.message}`);
        }
    }

    // Schedule Actions
    function handleEditSchedule(scheduleId) {
        editingScheduleId = scheduleId;
        const scheduleToEdit = schedules.find(sch => sch.id === scheduleId);
        if (scheduleToEdit && scheduleBusSelect && scheduleRouteSelect && scheduleDepartureInput && scheduleArrivalInput && addScheduleFormButton) {
            scheduleBusSelect.value = scheduleToEdit.bus_id;
            scheduleRouteSelect.value = scheduleToEdit.route_id;
            // Format date for datetime-local input
            scheduleDepartureInput.value = scheduleToEdit.departure_time.slice(0, 16); 
            scheduleArrivalInput.value = scheduleToEdit.arrival_time.slice(0, 16);
            addScheduleFormButton.textContent = 'Update Schedule';
            addScheduleForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    async function handleDeleteSchedule(scheduleId) {
        if (!confirm('Are you sure you want to delete this schedule?')) return;
        try {
            const response = await fetch(`${API_URL}/schedules/${scheduleId}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            await fetchSchedules(); // Refresh the list
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert(`Error deleting schedule: ${error.message}`);
        }
    }

    // --- Navigation ---
    function switchView(viewName) {
        currentView = viewName;
        if(busesView) busesView.style.display = 'none';
        if(routesView) routesView.style.display = 'none';
        if(schedulesView) schedulesView.style.display = 'none';

        if (viewName === 'buses') {
            if(busesView) busesView.style.display = 'block';
            fetchBuses(); 
        } else if (viewName === 'routes') {
            if(routesView) routesView.style.display = 'block';
            fetchRoutes();
        } else if (viewName === 'schedules') {
            if(schedulesView) schedulesView.style.display = 'block';
            // Ensure buses and routes are loaded for dropdowns before fetching schedules
            Promise.all([fetchBuses(), fetchRoutes()]).then(() => {
                populateBusAndRouteDropdowns();
                fetchSchedules();
            });
        }
    }

    if (navBusesBtn) navBusesBtn.addEventListener('click', () => switchView('buses'));
    if (navRoutesBtn) navRoutesBtn.addEventListener('click', () => switchView('routes'));
    if (navSchedulesBtn) navSchedulesBtn.addEventListener('click', () => switchView('schedules'));

    // --- Initial Load ---
    async function initialLoad() {
        // Set the default view (buses)
        // We fetch data within switchView, so this will trigger initial fetches
        switchView('buses'); 
    }

    // Call initialLoad after DOM is fully loaded
    initialLoad();
});

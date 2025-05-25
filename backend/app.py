import uuid
from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory data storage
buses = []
routes = []
schedules = []

# Helper function to find an item by ID
def find_item(item_id, item_list):
    return next((item for item in item_list if item['id'] == item_id), None)

# API Endpoints for Buses
@app.route('/api/buses', methods=['GET'])
def get_buses():
    return jsonify(buses)

@app.route('/api/buses/<string:bus_id>', methods=['GET'])
def get_bus(bus_id):
    bus = find_item(bus_id, buses)
    if bus:
        return jsonify(bus)
    return jsonify({'message': 'Bus not found'}), 404

@app.route('/api/buses', methods=['POST'])
def create_bus():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'capacity')):
        return jsonify({'message': 'Missing name or capacity in request body'}), 400
    new_bus = {
        'id': uuid.uuid4().hex,
        'name': data['name'],
        'capacity': data['capacity']
    }
    buses.append(new_bus)
    return jsonify(new_bus), 201

@app.route('/api/buses/<string:bus_id>', methods=['PUT'])
def update_bus(bus_id):
    bus = find_item(bus_id, buses)
    if not bus:
        return jsonify({'message': 'Bus not found'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Request body cannot be empty'}), 400
    
    # Update fields if provided in the request
    if 'name' in data:
        bus['name'] = data['name']
    if 'capacity' in data:
        bus['capacity'] = data['capacity']
        
    return jsonify(bus)

@app.route('/api/buses/<string:bus_id>', methods=['DELETE'])
def delete_bus(bus_id):
    global buses
    bus = find_item(bus_id, buses)
    if not bus:
        return jsonify({'message': 'Bus not found'}), 404
    buses = [b for b in buses if b['id'] != bus_id]
    return jsonify({'message': 'Bus deleted successfully'})

# API Endpoints for Routes
@app.route('/api/routes', methods=['GET'])
def get_routes():
    return jsonify(routes)

@app.route('/api/routes/<string:route_id>', methods=['GET'])
def get_route(route_id):
    route = find_item(route_id, routes)
    if route:
        return jsonify(route)
    return jsonify({'message': 'Route not found'}), 404

@app.route('/api/routes', methods=['POST'])
def create_route():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'stops')):
        return jsonify({'message': 'Missing name or stops in request body'}), 400
    if not isinstance(data['stops'], list):
        return jsonify({'message': 'Field "stops" must be an array of strings'}), 400
    new_route = {
        'id': uuid.uuid4().hex,
        'name': data['name'],
        'stops': data['stops']
    }
    routes.append(new_route)
    return jsonify(new_route), 201

@app.route('/api/routes/<string:route_id>', methods=['PUT'])
def update_route(route_id):
    route = find_item(route_id, routes)
    if not route:
        return jsonify({'message': 'Route not found'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Request body cannot be empty'}), 400
    
    if 'name' in data:
        route['name'] = data['name']
    if 'stops' in data:
        if not isinstance(data['stops'], list):
            return jsonify({'message': 'Field "stops" must be an array of strings'}), 400
        route['stops'] = data['stops']
        
    return jsonify(route)

@app.route('/api/routes/<string:route_id>', methods=['DELETE'])
def delete_route(route_id):
    global routes
    route = find_item(route_id, routes)
    if not route:
        return jsonify({'message': 'Route not found'}), 404
    routes = [r for r in routes if r['id'] != route_id]
    return jsonify({'message': 'Route deleted successfully'})

# API Endpoints for Schedules
@app.route('/api/schedules', methods=['GET'])
def get_schedules():
    return jsonify(schedules)

@app.route('/api/schedules/<string:schedule_id>', methods=['GET'])
def get_schedule(schedule_id):
    schedule = find_item(schedule_id, schedules)
    if schedule:
        return jsonify(schedule)
    return jsonify({'message': 'Schedule not found'}), 404

@app.route('/api/schedules', methods=['POST'])
def create_schedule():
    data = request.get_json()
    if not data or not all(k in data for k in ('bus_id', 'route_id', 'departure_time', 'arrival_time')):
        return jsonify({'message': 'Missing required fields in request body'}), 400

    # Check if bus_id and route_id exist
    if not find_item(data['bus_id'], buses):
        return jsonify({'message': f"Bus with id {data['bus_id']} not found"}), 400
    if not find_item(data['route_id'], routes):
        return jsonify({'message': f"Route with id {data['route_id']} not found"}), 400

    new_schedule = {
        'id': uuid.uuid4().hex,
        'bus_id': data['bus_id'],
        'route_id': data['route_id'],
        'departure_time': data['departure_time'],
        'arrival_time': data['arrival_time']
    }
    schedules.append(new_schedule)
    return jsonify(new_schedule), 201

@app.route('/api/schedules/<string:schedule_id>', methods=['PUT'])
def update_schedule(schedule_id):
    schedule = find_item(schedule_id, schedules)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Request body cannot be empty'}), 400

    # Check if bus_id and route_id exist if they are being updated
    if 'bus_id' in data and not find_item(data['bus_id'], buses):
        return jsonify({'message': f"Bus with id {data['bus_id']} not found"}), 400
    if 'route_id' in data and not find_item(data['route_id'], routes):
        return jsonify({'message': f"Route with id {data['route_id']} not found"}), 400

    # Update fields if provided
    for key in ['bus_id', 'route_id', 'departure_time', 'arrival_time']:
        if key in data:
            schedule[key] = data[key]
            
    return jsonify(schedule)

@app.route('/api/schedules/<string:schedule_id>', methods=['DELETE'])
def delete_schedule(schedule_id):
    global schedules
    schedule = find_item(schedule_id, schedules)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404
    schedules = [s for s in schedules if s['id'] != schedule_id]
    return jsonify({'message': 'Schedule deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

// PassengerBookingDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';
import { Card, Table, Button } from 'react-bootstrap';

export default function PassengerBookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking || {
    passenger: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+94 77 123 4567',
    },
    journey: {
      Name: 'Express Cruiser',
      city: 'Colombo',
      departure: 9,
      arrival: 11,
      fare: 750,
      seats: [12, 14, 15],
      date: '2025-06-10',
    },
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const totalPrice = booking.journey.fare * booking.journey.seats.length;

  return (
      <div className={`details-container ${visible ? 'show' : ''}`}>
        <header className="details-header">
          <h1>Booking Details</h1>
          <Button variant="outline-light" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </header>

        <main className="details-main">
          {/* Passenger Information */}
          <Card className="info-card">
            <Card.Header as="h5">Passenger Information</Card.Header>
            <Card.Body>
              <Table borderless>
                <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{booking.passenger.name}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{booking.passenger.email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{booking.passenger.phone}</td>
                </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Journey and Seat Details */}
          <Card className="journey-card">
            <Card.Header as="h5">Journey Information</Card.Header>
            <Card.Body>
              <Table bordered hover responsive>
                <tbody>
                <tr>
                  <td>Bus Name</td>
                  <td>{booking.journey.Name}</td>
                </tr>
                <tr>
                  <td>Route</td>
                  <td>
                    {booking.journey.city} → Matara
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{booking.journey.date}</td>
                </tr>
                <tr>
                  <td>Departure</td>
                  <td>
                    {booking.journey.departure < 12
                        ? `${booking.journey.departure} AM`
                        : `${booking.journey.departure} PM`}
                  </td>
                </tr>
                <tr>
                  <td>Arrival</td>
                  <td>
                    {booking.journey.arrival < 12
                        ? `${booking.journey.arrival} AM`
                        : `${booking.journey.arrival} PM`}
                  </td>
                </tr>
                <tr>
                  <td>Seats</td>
                  <td>{booking.journey.seats.join(', ')}</td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>LKR {totalPrice}.00</td>
                </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </main>
      </div>
  );
}

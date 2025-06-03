// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';
import { Card, Table, Button } from 'react-bootstrap';
import Journey from '../components/Timetable-components/Journey';
import SeatingLayout from '../components/Timetable-components/SeatingLayout';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Expecting `location.state.journey` to be passed in from the previous page
  // If no journey in state, we redirect back to home/map
  const journey = location.state?.journey || null;

  useEffect(() => {
    if (!journey) {
      navigate('/', { replace: true });
    }
  }, [journey, navigate]);

  // Local state for seat selection
  const [selectedSeats, setSelectedSeats] = useState([]);
  // In real app, occupied seats would come from an API; here we mock a few
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // On mount, simulate fetching occupied seats (e.g. from journey.id)
  useEffect(() => {
    if (journey) {
      // e.g. fetch(`/api/buses/${journey.id}/occupied-seats`)
      //   .then(res => res.json())
      //   .then(data => setOccupiedSeats(data));
      // For now, just hardcode a few:
      setOccupiedSeats([5, 10, 15]);
    }
  }, [journey]);

  if (!journey) {
    return null;
  }

  const totalPrice = journey.fare * selectedSeats.length;

  const handlePay = () => {
    // Put your payment logic here.
    // For now, just alert and redirect back to home
    alert(`You paid LKR ${totalPrice} for seats: ${selectedSeats.join(', ')}.`);
    navigate('/', { replace: true });
  };

  return (
      <div className="booking-page">
        <header className="booking-header">
          <h1>Your Booking Details</h1>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </header>

        <main className="booking-main">
          <div className="journey-section">
            <Journey journey={journey} color="primary" inModal={false} />
          </div>

          <div className="booking-content">
            {/* ─── Booking Info Card ───────────────────────────────── */}
            <Card className="journey-details-card">
              <Card.Header as="h5">Booking Information</Card.Header>
              <Card.Body>
                <Card.Subtitle>Journey Details</Card.Subtitle>
                <br />
                <Table bordered hover responsive>
                  <tbody>
                  <tr>
                    <td>Bus Name</td>
                    <td>{journey.Name}</td>
                  </tr>
                  <tr>
                    <td>Route Number</td>
                    <td>{journey.routeNumber || '197'}</td>
                  </tr>
                  <tr>
                    <td>Start</td>
                    <td>
                      {journey.city} at{' '}
                      {journey.departure < 12
                          ? `${journey.departure} AM`
                          : `${journey.departure} PM`}
                    </td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>
                      Matara at{' '}
                      {journey.arrival < 12
                          ? `${journey.arrival} AM`
                          : `${journey.arrival} PM`}
                    </td>
                  </tr>
                  <tr>
                    <td>Number of seats</td>
                    <td>{selectedSeats.length}</td>
                  </tr>
                  <tr>
                    <td>Total price</td>
                    <td>
                      {journey.fare} × {selectedSeats.length} = {totalPrice}
                    </td>
                  </tr>
                  </tbody>
                </Table>

                <div className="btn-container">
                  <Button
                      variant="primary"
                      style={{ width: '10rem' }}
                      disabled={selectedSeats.length === 0}
                      onClick={handlePay}
                  >
                    Pay
                  </Button>
                </div>
                <br />
                <Card.Text>
                  Share this journey with your loved ones or friends so they can be a part of it.
                </Card.Text>
              </Card.Body>
            </Card>

            {/* ─── Seating Layout Card ───────────────────────────────── */}
            <Card className="seating-card">
              <Card.Header as="h5">Select Your Seats</Card.Header>
              <Card.Body>
                <SeatingLayout
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    occupiedSeats={occupiedSeats}
                />
              </Card.Body>
            </Card>
          </div>
        </main>
      </div>
  );
}

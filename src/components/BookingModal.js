// BookingModal.js
import React, { useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import Journey from './Timetable-components/Journey';
import './BookingModal.css';
import SeatingLayout from './Timetable-components/SeatingLayout';

export default function BookingModal({
                                         journey,
                                         onClose,
                                         onPay
                                     }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    // Mock occupied seats - in real app this would come from API
    const [occupiedSeats] = useState([5, 10, 15]);

    const totalPrice = journey.fare * selectedSeats.length;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>

                <div className="ticket-container">
                    <h2>Ticket</h2>
                    <Journey journey={journey} color="primary" inModal={true} />

                    <div className="ticket-info">
                        <Card className="journey-details">
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
                                        <td>197</td>
                                    </tr>
                                    <tr>
                                        <td>Start</td>
                                        <td>
                                            {journey.city} at {journey.departure < 12 ?
                                            `${journey.departure} AM` : `${journey.departure} PM`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td>
                                            Matara at {journey.arrival < 12 ?
                                            `${journey.arrival} AM` : `${journey.arrival} PM`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Number of seats</td>
                                        <td>{selectedSeats.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Total price</td>
                                        <td>
                                            {journey.fare} x {selectedSeats.length} = {totalPrice}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>

                                <div className="btn-container">
                                    <Button
                                        variant="primary"
                                        style={{ width: "10rem" }}
                                        disabled={selectedSeats.length === 0}
                                        onClick={() => onPay(selectedSeats)}
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

                        <Card className="seating-card">
                            <SeatingLayout
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                occupiedSeats={occupiedSeats}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useState } from "react";
import Navibar from "../components/Navibar";
import Journey from "../components/Timetable-components/Journey";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import SeatingLayout from "../components/Timetable-components/SeatingLayout";
import "../components/Timetable-components/journey.css";

export default function Booking() {

  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = [3, 4, 14, 29]; 

  const busJourney = {
    city: "Colombo",
    fare: 1100,
    Name: "Mighty Travels",
    depature: 10,
    arrival: 12,
    seats: 30,
  };

  return (
    <div>
      <header>
        <h1>Booking Page</h1>
        <br />
        <Navibar />
      </header>
      <main>
        <section>
          <div className="ticket_container">
            <div className="ticket">
              <h2>Ticket</h2>
              <Journey journey={busJourney} color={"primary"} />
              <div className="ticketInfo">
                <Card className="journeyDetails">
                  <Card.Header as="h5">Booking Information</Card.Header>
                  <Card.Body>
                    <Card.Subtitle>Journey Details</Card.Subtitle>
                    <br />
                    <Table bordered hover responsive="lg">
                      <tbody>
                        <tr>
                          <td>Bus Name</td>
                          <td>{busJourney.Name}</td>
                        </tr>
                        <tr>
                          <td>Route Number</td>
                          <td>197</td>
                        </tr>
                        <tr>
                          <td>Start</td>
                          <td>{busJourney.city} at {(busJourney.depature < 12) ? `${busJourney.depature} A:M` : `${busJourney.depature} P:M`}</td>
                        </tr>
                        <tr>
                          <td>Destination</td>
                          <td>Matara at {(busJourney.arrival < 12) ? `${busJourney.arrival} A:M` : `${busJourney.arrival} P:M`}</td>
                        </tr>
                        <tr>
                          <td>Number of seats</td>
                          <td>{selectedSeats.length}</td>
                        </tr>
                        <tr>
                          <td>Total price</td>
                          <td>{busJourney.fare } x {selectedSeats.length} = {busJourney.fare * selectedSeats.length}</td>
                        </tr>
                      </tbody>
                    </Table>
              
                    <div className="btnContainer">
                      <Button variant="primary" style={{ width: "10rem" }}>Pay</Button>
                    </div>
                    <br />
                    <Card.Text>
                      Share this journey with your loved ones or friends so they can be a part of it.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <SeatingLayout 
                    selectedSeats={selectedSeats} 
                    setSelectedSeats={setSelectedSeats} 
                    occupiedSeats={occupiedSeats} 
                  />
                 
                  
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

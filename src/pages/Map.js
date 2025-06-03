// Map.js
import React, { useState, useEffect } from "react";
import "../components/Header.css";
import "./Home.css";
import Sort from "./Sort";
import businfo from "../components/Timetable-components/busInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Journey from "../components/Timetable-components/Journey";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal"; // Add this import

export default function Map() {
  const [bustable, setBusinfo] = useState(businfo);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const destination = location.state?.destination || "";
  const navigate = useNavigate();
  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);

  useEffect(() => {
    if (destination) {
      const filteredBustable = businfo.filter(
          (bus) => bus.city === destination
      );
      setBusinfo(filteredBustable);
    }
  }, [destination]);

  const filteredBustable = bustable.filter(
      (bus) =>
          bus.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (bus.city && bus.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function SortbyName(bustable) {
    bustable = bustable.slice().sort((a, b) => a.Name.localeCompare(b.Name));
    setBusinfo(bustable);
  }

  function SortbyAttribute(bustable, attribute) {
    bustable = bustable.slice().sort((a, b) => a[attribute] - b[attribute]);
    setBusinfo(bustable);
  }

  // Handle journey selection
  const handleJourneySelect = (journey) => {
    setSelectedJourney(journey);
    setShowModal(true);
  };

  // Handle payment
  const handlePayment = (selectedSeats) => {
    console.log("Processing payment for seats:", selectedSeats);
    // In real app: navigate to payment page
    setShowModal(false);
  };

  return (
      <div className="map-container">
        <div className="search-bar-container">
          <input
              type="text"
              placeholder="Search buses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
          />
        </div>
        <div className="content-container">
          <Sort
              bustable={bustable}
              SortbyName={SortbyName}
              SortbyAttribute={SortbyAttribute}
          />
          <Timetable
              bustable={filteredBustable}
              onJourneySelect={handleJourneySelect}
          />
        </div>

        {/* Modal */}
        {showModal && selectedJourney && (
            <BookingModal
                journey={selectedJourney}
                onClose={() => setShowModal(false)}
                onPay={handlePayment}
            />
        )}

        <Footer />
      </div>
  );
}

function Timetable({ bustable, onJourneySelect }) {
  const color = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ];

  return (
      <div>
        <div className="list">
          <ul>
            {bustable.map((init) => (
                <Journey
                    key={init.id}
                    journey={init}
                    color={color[Math.floor(Math.random() * 7)]}
                    onClick={() => onJourneySelect(init)}
                />
            ))}
          </ul>
        </div>
      </div>
  );
}
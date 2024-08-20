import React from 'react';
import './SeatingLayout.css';

const Seat = ({ seatNumber, isSelected, isOccupied, onSeatClick }) => {
  const seatClass = `seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`;
  
  return (
    <div 
      className={seatClass} 
      onClick={(e) => {
        e.preventDefault(); // Prevent any default behavior (if needed)
        !isOccupied && onSeatClick(seatNumber); // Handle the seat click
      }}
    >
      {seatNumber}
    </div>
  );
};

const SeatingLayout = ({ selectedSeats, setSelectedSeats, occupiedSeats }) => {

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(prevSelectedSeats =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter(seat => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 49; i++) {
      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          isOccupied={occupiedSeats.includes(i)}
          onSeatClick={handleSeatClick}
        />
      );
    }
    return seats;
  };

  return (
    <div className="seating-layout">
      <div className="door">Seats</div>
      <div className="seats">
        {renderSeats()}
      </div>
      <div className="rear"></div>
    </div>
  );
};

export default SeatingLayout;

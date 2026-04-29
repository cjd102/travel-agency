import React, { useState } from "react";
import { Flight } from "../types";
import styles from "./FlightCard.module.css";

interface FlightCardProps {
  flight: Flight;
  onBook: (flightId: string, passengerName: string) => void;
  isLoading: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  onBook,
  isLoading,
}) => {
  const [passengerName, setPassengerName] = useState("");

  const handleBook = () => {
    if (!passengerName.trim()) {
      alert("Please enter passenger name");
      return;
    }
    onBook(flight.id, passengerName);
    setPassengerName("");
  };

  const departure = new Date(flight.departure);
  const arrival = new Date(flight.arrival);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{flight.airline}</h3>
        <span className={styles.price}>${flight.price}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.location}>
          <strong>{flight.from}</strong>
          <span>{departure.toLocaleString()}</span>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.location}>
          <strong>{flight.to}</strong>
          <span>{arrival.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.info}>
        <span>Seats: {flight.availableSeats} available</span>
      </div>

      <div className={styles.bookingForm}>
        <input
          type="text"
          placeholder="Passenger name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          disabled={isLoading || flight.availableSeats === 0}
        />
        <button
          onClick={handleBook}
          disabled={
            isLoading || flight.availableSeats === 0 || !passengerName.trim()
          }
        >
          {flight.availableSeats === 0 ? "No Seats" : "Book Flight"}
        </button>
      </div>
    </div>
  );
};

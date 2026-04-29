import React from "react";
import { Booking, Flight } from "../types";
import styles from "./BookingsList.module.css";

interface BookingsListProps {
  bookings: Booking[];
  flights: Flight[];
  onCancel: (bookingId: string) => void;
  isLoading: boolean;
}

export const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  flights,
  onCancel,
  isLoading,
}) => {
  if (bookings.length === 0) {
    return <div className={styles.empty}>No bookings yet</div>;
  }

  return (
    <div className={styles.list}>
      {bookings.map((booking) => {
        const flight = flights.find((f) => f.id === booking.flightId);
        return (
          <div
            key={booking.id}
            className={`${styles.item} ${booking.status === "cancelled" ? styles.cancelled : ""}`}
          >
            <div className={styles.header}>
              <h4>{flight?.airline || "Unknown Airline"}</h4>
              <span className={styles.status}>{booking.status}</span>
            </div>
            <div className={styles.details}>
              <div>
                <strong>Route:</strong> {flight?.from} → {flight?.to}
              </div>
              <div>
                <strong>Passenger:</strong> {booking.passengerName}
              </div>
              <div>
                <strong>Seat:</strong> {booking.seatNumber}
              </div>
              <div>
                <strong>Price:</strong> ${booking.price}
              </div>
            </div>
            {booking.status === "confirmed" && (
              <button
                className={styles.cancelBtn}
                onClick={() => onCancel(booking.id)}
                disabled={isLoading}
              >
                Cancel Booking
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

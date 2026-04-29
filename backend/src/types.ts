// Types for the travel agency application
export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: Date;
  arrival: Date;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  passengerName: string;
  seatNumber: string;
  bookingDate: Date;
  price: number;
  status: "confirmed" | "cancelled";
}

export interface User {
  id: string;
  name: string;
  bankAccount: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}

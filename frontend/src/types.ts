export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string; // ISO date
  arrival: string; // ISO date
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
  bookingDate: string;
  price: number;
  status: "confirmed" | "cancelled";
}

export interface User {
  id: string;
  name: string;
  bankAccount: number;
  createdAt: string;
}

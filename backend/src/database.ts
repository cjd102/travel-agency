import { v4 as uuidv4 } from "uuid";
import { Flight, Booking, User, Payment } from "./types";
import { addDays, addHours } from "date-fns";

// In-memory database
export class Database {
  static flights: Flight[] = [];
  static bookings: Booking[] = [];
  static users: Map<string, User> = new Map();
  static payments: Payment[] = [];

  static initialize() {
    // Initialize default user
    const defaultUserId = "user-1";
    if (!this.users.has(defaultUserId)) {
      this.users.set(defaultUserId, {
        id: defaultUserId,
        name: "John Traveler",
        bankAccount: 500,
        createdAt: new Date(),
      });
    }

    // Initialize sample flights
    if (this.flights.length === 0) {
      const now = new Date();
      
      const createArrival = (days: number, hours: number, minutes: number) => {
        const date = addDays(now, days);
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

      this.flights = [
        {
          id: uuidv4(),
          airline: "SkyWings Airlines",
          from: "New York (JFK)",
          to: "Los Angeles (LAX)",
          departure: addDays(now, 3),
          arrival: createArrival(3, 23, 30),
          price: 180,
          availableSeats: 50,
          totalSeats: 150,
        },
        {
          id: uuidv4(),
          airline: "United Express",
          from: "New York (JFK)",
          to: "Los Angeles (LAX)",
          departure: addDays(now, 5),
          arrival: createArrival(5, 22, 15),
          price: 150,
          availableSeats: 80,
          totalSeats: 200,
        },
        {
          id: uuidv4(),
          airline: "Delta Airways",
          from: "New York (JFK)",
          to: "Miami (MIA)",
          departure: addDays(now, 2),
          arrival: createArrival(2, 19, 45),
          price: 120,
          availableSeats: 30,
          totalSeats: 120,
        },
        {
          id: uuidv4(),
          airline: "American Airlines",
          from: "New York (JFK)",
          to: "Chicago (ORD)",
          departure: addDays(now, 1),
          arrival: createArrival(1, 16, 30),
          price: 95,
          availableSeats: 60,
          totalSeats: 180,
        },
        {
          id: uuidv4(),
          airline: "Southwest Airlines",
          from: "Los Angeles (LAX)",
          to: "San Francisco (SFO)",
          departure: addDays(now, 4),
          arrival: createArrival(4, 18, 0),
          price: 85,
          availableSeats: 45,
          totalSeats: 160,
        },
        {
          id: uuidv4(),
          airline: "Jet Blue",
          from: "Boston (BOS)",
          to: "Miami (MIA)",
          departure: addDays(now, 6),
          arrival: createArrival(6, 20, 30),
          price: 140,
          availableSeats: 70,
          totalSeats: 170,
        },
      ];
    }
  }

  static getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  static getFlights(): Flight[] {
    return this.flights.map((f) => ({
      ...f,
      departure: new Date(f.departure),
      arrival: new Date(f.arrival),
    }));
  }

  static getFlightById(flightId: string): Flight | undefined {
    return this.flights.find((f) => f.id === flightId);
  }

  static getBookingsByUser(userId: string): Booking[] {
    return this.bookings.filter((b) => b.userId === userId);
  }

  static createBooking(
    userId: string,
    flightId: string,
    passengerName: string,
    price: number
  ): Booking | null {
    const flight = this.getFlightById(flightId);
    if (!flight || flight.availableSeats <= 0) {
      return null;
    }

    const user = this.getUser(userId);
    if (!user || user.bankAccount < price) {
      return null;
    }

    const seatNumber = `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`;

    const booking: Booking = {
      id: uuidv4(),
      userId,
      flightId,
      passengerName,
      seatNumber,
      bookingDate: new Date(),
      price,
      status: "confirmed",
    };

    flight.availableSeats--;
    user.bankAccount -= price;
    this.bookings.push(booking);

    return booking;
  }

  static cancelBooking(bookingId: string): Booking | null {
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking || booking.status === "cancelled") {
      return null;
    }

    const user = this.getUser(booking.userId);
    const flight = this.getFlightById(booking.flightId);

    if (user && flight) {
      user.bankAccount += booking.price;
      flight.availableSeats++;
      booking.status = "cancelled";
    }

    return booking;
  }
}

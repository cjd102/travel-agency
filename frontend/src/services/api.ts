import axios from "axios";
import { Flight, Booking, User } from "../types";

const API_URL = "http://localhost:5001/api";
const USER_ID = "user-1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-user-id": USER_ID,
  },
});

export const apiService = {
  // Flights
  getFlights: async (): Promise<Flight[]> => {
    const response = await api.get("/flights");
    return response.data;
  },

  searchFlights: async (from?: string, to?: string): Promise<Flight[]> => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    const response = await api.get(`/flights/search?${params}`);
    return response.data;
  },

  getFlightById: async (flightId: string): Promise<Flight> => {
    const response = await api.get(`/flights/${flightId}`);
    return response.data;
  },

  // User
  getUser: async (): Promise<User> => {
    const response = await api.get("/user");
    return response.data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    const response = await api.get("/user/bookings");
    return response.data;
  },

  bookFlight: async (
    flightId: string,
    passengerName: string
  ): Promise<Booking> => {
    const response = await api.post("/user/book", {
      flightId,
      passengerName,
    });
    return response.data;
  },

  cancelBooking: async (bookingId: string): Promise<Booking> => {
    const response = await api.post(`/user/cancel-booking/${bookingId}`);
    return response.data;
  },
};

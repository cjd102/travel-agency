import React, { useState, useEffect } from "react";
import { Flight, Booking, User } from "./types";
import { apiService } from "./services/api";
import { FlightCard } from "./components/FlightCard";
import { BookingsList } from "./components/BookingsList";
import { SearchBar } from "./components/SearchBar";
import "./App.css";

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"flights" | "bookings">("flights");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [flightData, bookingData, userData] = await Promise.all([
        apiService.getFlights(),
        apiService.getUserBookings(),
        apiService.getUser(),
      ]);
      setFlights(flightData);
      setBookings(bookingData);
      setUser(userData);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (from: string, to: string) => {
    setIsLoading(true);
    try {
      if (!from && !to) {
        const flightData = await apiService.getFlights();
        setFlights(flightData);
      } else {
        const flightData = await apiService.searchFlights(from, to);
        setFlights(flightData);
      }
    } catch (err) {
      setError("Failed to search flights");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookFlight = async (flightId: string, passengerName: string) => {
    const flight = flights.find((f) => f.id === flightId);
    if (!flight) return;

    setIsLoading(true);
    try {
      const booking = await apiService.bookFlight(flightId, passengerName);
      setBookings([...bookings, booking]);

      // Update user balance
      const userData = await apiService.getUser();
      setUser(userData);

      // Refresh flights to update available seats
      const flightData = await apiService.getFlights();
      setFlights(flightData);

      setError("");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Failed to book flight. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this booking? You will be refunded."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const cancelledBooking = await apiService.cancelBooking(bookingId);
      setBookings(
        bookings.map((b) => (b.id === bookingId ? cancelledBooking : b))
      );

      // Update user balance
      const userData = await apiService.getUser();
      setUser(userData);

      // Refresh flights to update available seats
      const flightData = await apiService.getFlights();
      setFlights(flightData);

      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to cancel booking");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>✈️ Travel Agency</h1>
        {user && (
          <div className="user-info">
            <span>{user.name}</span>
            <div className="balance">
              💰 ${user.bankAccount.toFixed(2)}
            </div>
          </div>
        )}
      </header>

      {error && <div className="error">{error}</div>}

      <div className="tabs">
        <button
          className={`tab ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          Search Flights
        </button>
        <button
          className={`tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings ({bookings.length})
        </button>
      </div>

      <div className="container">
        {activeTab === "flights" && (
          <>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <div className="flights-list">
              {flights.length === 0 ? (
                <div className="empty">No flights found</div>
              ) : (
                flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onBook={handleBookFlight}
                    isLoading={isLoading}
                  />
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "bookings" && (
          <BookingsList
            bookings={bookings}
            flights={flights}
            onCancel={handleCancelBooking}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;

import { Router, Request, Response } from "express";
import { Database } from "../database";

const router = Router();

// Get user data (bank account, etc)
router.get("/", (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string || "user-1";
  const user = Database.getUser(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Get user bookings
router.get("/bookings", (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string || "user-1";
  const bookings = Database.getBookingsByUser(userId);
  res.json(bookings);
});

// Book a flight
router.post("/book", (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string || "user-1";
  const { flightId, passengerName } = req.body;

  if (!flightId || !passengerName) {
    return res
      .status(400)
      .json({ error: "Missing flightId or passengerName" });
  }

  const flight = Database.getFlightById(flightId);
  if (!flight) {
    return res.status(404).json({ error: "Flight not found" });
  }

  const booking = Database.createBooking(userId, flightId, passengerName, flight.price);

  if (!booking) {
    return res.status(400).json({
      error: "Cannot book flight. Insufficient funds or no available seats.",
    });
  }

  res.json(booking);
});

// Cancel booking
router.post("/cancel-booking/:bookingId", (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const booking = Database.cancelBooking(bookingId);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found or already cancelled" });
  }

  res.json(booking);
});

export default router;

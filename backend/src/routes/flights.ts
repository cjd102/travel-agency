import { Router, Request, Response } from "express";
import { Database } from "../database";

const router = Router();

// Get all flights
router.get("/", (req: Request, res: Response) => {
  const flights = Database.getFlights();
  res.json(flights);
});

// Get flights by route
router.get("/search", (req: Request, res: Response) => {
  const { from, to } = req.query;
  let flights = Database.getFlights();

  if (from) {
    flights = flights.filter(
      (f) => f.from.toLowerCase().includes((from as string).toLowerCase())
    );
  }

  if (to) {
    flights = flights.filter(
      (f) => f.to.toLowerCase().includes((to as string).toLowerCase())
    );
  }

  res.json(flights);
});

// Get single flight
router.get("/:id", (req: Request, res: Response) => {
  const flight = Database.getFlightById(req.params.id);
  if (!flight) {
    return res.status(404).json({ error: "Flight not found" });
  }
  res.json(flight);
});

export default router;

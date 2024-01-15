import React, { createContext, useContext } from "react";
import { useAsyncStorageState } from "../hooks/useAsyncStorageState";

const TripContext = createContext();

export const useTripContext = () => {
  return useContext(TripContext);
};

export const TripProvider = ({ children }) => {
  const [trips, updateTrips] = useAsyncStorageState("trips", []);

  const addTrip = (newTrip) => {
    // Generate a unique ID using the current timestamp
    const tripWithId = { id: Date.now().toString(), ...newTrip };
    updateTrips([...trips, tripWithId]);
  };

  const value = {
    trips,
    addTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

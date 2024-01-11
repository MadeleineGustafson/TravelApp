import React, { createContext, useContext } from "react";
import { useAsyncStorageState } from "../hooks/useAsyncStorageState";

const TripContext = createContext();

export const useTripContext = () => {
  return useContext(TripContext);
};

export const TripProvider = ({ children }) => {
  const [trips, updateTrips] = useAsyncStorageState("trips", []);

  const addTrip = (newTrip) => {
    updateTrips([...trips, newTrip]);
  };

  const value = {
    trips,
    addTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

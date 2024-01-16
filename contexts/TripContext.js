import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext } from "react";
import { useAsyncStorageState } from "../hooks/useAsyncStorageState";

const TripContext = createContext();

export const useTripContext = () => {
  return useContext(TripContext);
};

export const TripProvider = ({ children }) => {
  const [trips, updateTrips] = useAsyncStorageState("trips", []);

  const addTrip = async (newTrip) => {
    try {
      // Generate a unique ID using the current timestamp
      const tripWithId = { id: Date.now().toString(), ...newTrip };

      // Store the new trip data in AsyncStorage
      await AsyncStorage.setItem(
        `tripData:${tripWithId.id}`,
        JSON.stringify(tripWithId)
      );

      updateTrips([...trips, tripWithId]);
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      const updatedTrips = trips.filter((trip) => trip.id !== tripId);

      // Remove the corresponding trip data from AsyncStorage
      await AsyncStorage.removeItem(`tripData:${tripId}`);

      updateTrips(updatedTrips);
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const getTrip = async (tripId) => {
    try {
      // Retrieve trip data from AsyncStorage based on the provided id
      const tripData = await AsyncStorage.getItem(`tripData:${tripId}`);
      return tripData ? JSON.parse(tripData) : null;
    } catch (error) {
      console.error("Error fetching trip data:", error);
      return null;
    }
  };

  const value = {
    trips,
    addTrip,
    deleteTrip,
    getTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

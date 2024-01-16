import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTripContext } from "../contexts/TripContext";

function MyTripsScreen() {
  const navigation = useNavigation();

  const { trips, deleteTrip } = useTripContext();

  const navigateToCalendar = (trip) => {
    navigation.navigate("calendar", { tripData: trip });
  };

  const navigateToNewTrip = () => {
    navigation.navigate("newTrip", {});
  };

  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#163532",
      }}
    >
      <Text style={styles.pageTitle}>My trips:</Text>
      {trips.map((trip) => (
        <TouchableOpacity
          key={trip.id}
          onPress={() => navigateToCalendar(trip)}
          style={styles.tripContainer}
        >
          <Text style={styles.tripText}>{trip.destination}</Text>
          <Text style={styles.smallTripText}>
            {new Date(trip.startDate).toLocaleDateString()} -
            {new Date(trip.endDate).toLocaleDateString()}
          </Text>

          <Text key={trip.id} onPress={() => handleDeleteTrip(trip.id)}>
            Delete trip
          </Text>
        </TouchableOpacity>
      ))}
      {trips.length === 0 && <Text>No trips available</Text>}

      <TouchableOpacity onPress={navigateToNewTrip}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create New Trip</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tripContainer: {
    padding: 10,
    borderBottomWidth: 1, // Add bottom border
    borderBottomColor: "#D1FFA0", // Border color
    // Other styles...
  },

  pageTitle: {
    fontSize: 26,
    color: "#D1FFA0",
    fontWeight: "bold",
  },

  tripText: {
    fontSize: 23,
    color: "#D1FFA0",
  },

  smallTripText: {
    fontSize: 14,
    color: "#D1FFA0",
  },
  button: {
    backgroundColor: "#D1FFA0",
    padding: 10,
    borderRadius: 14,
    justifyContent: "flex-start",
    width: 200,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#163532",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyTripsScreen;

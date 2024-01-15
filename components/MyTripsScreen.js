import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTripContext } from "../contexts/TripContext";

function MyTripsScreen() {
  const navigation = useNavigation();
  const { trips } = useTripContext();

  const navigateToNewTrip = () => {
    navigation.navigate("newTrip", {});
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
      <Text>My trips:</Text>
      {trips.map((trip) => (
        <View key={trip.id} style={styles.tripContainer}>
          <Text style={styles.tripText}>{`Start Date: ${trip.startDate}`}</Text>
          <Text style={styles.tripText}>{`Location: ${trip.destination}`}</Text>
        </View>
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
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: 300,
  },
  tripText: {
    fontSize: 16,
    color: "#163532",
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

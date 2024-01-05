import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function NewTripScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const navigateToMainPage = () => {
    const tripData = {
      name: name,
      destination: destination,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
    };

    navigation.navigate("tripHomePage", { tripData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Plan new trip</Text>
      <SafeAreaView style={styles.formContainer}>
        <Text style={styles.labelText}>What is your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.labelText}>Where are you going?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your destination"
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <Text style={styles.labelText}>When are you going?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter start date"
          value={departureDate}
          onChangeText={(text) => setDepartureDate(text)}
        />
        <Text style={styles.labelText}>When are you coming home?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter end date"
          value={arrivalDate}
          onChangeText={(text) => setArrivalDate(text)}
        />

        <TouchableOpacity onPress={navigateToMainPage}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create New Trip</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#163532",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 18,
    color: "white",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: "white",
    color: "white",
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

export default NewTripScreen;

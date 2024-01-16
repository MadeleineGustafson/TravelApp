import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTripContext } from "../contexts/TripContext"; // Update the path

function NewTripScreen() {
  const navigation = useNavigation();
  const { addTrip } = useTripContext();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const toggleStartDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndPicker(!showEndPicker);
  };

  const [chosenStartDate, setChosenStartDate] = useState(todayString);
  const [chosenEndDate, setChosenEndDate] = useState(todayString);

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setStartDate(currentDate);
      if (Platform.OS === "android") {
        setStartDate(currentDate);
        toggleStartDatePicker();
      }
    } else {
      toggleStartDatePicker();
    }
  };

  const onChangeEndDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setEndDate(currentDate);
      if (Platform.OS === "android") {
        setEndDate(currentDate);
        toggleEndDatePicker();
      }
    } else {
      toggleEndDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setChosenStartDate(startDate.toISOString().split("T")[0]);
    toggleStartDatePicker();
  };

  const confirmIOSEndDate = () => {
    setChosenEndDate(endDate.toISOString().split("T")[0]);
    toggleEndDatePicker();
  };
  const navigateToCalendar = async () => {
    try {
      const newTrip = {
        id: Date.now().toString(),
        name: name,
        destination: destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      // Store the new trip data in AsyncStorage with a unique key using trip ID
      await AsyncStorage.setItem(
        `tripData:${newTrip.id}`,
        JSON.stringify(newTrip)
      );
      addTrip(newTrip);

      // Navigate to the "calendar" screen
      navigation.navigate("calendar", { tripData: newTrip });
    } catch (error) {
      console.error("Error saving trip data:", error);
    }
  };

  return (
    <>
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

          <Text style={styles.labelText}>Enter first day of your trip:</Text>

          {!showPicker && (
            <Pressable onPress={toggleStartDatePicker}>
              <TextInput
                placeholder={chosenStartDate}
                editable={false}
                onPressIn={toggleStartDatePicker}
                style={styles.input}
                placeholderTextColor="#ffffff"
              />
            </Pressable>
          )}

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={startDate}
              onChange={onChange}
              style={styles.DateTimePicker}
            />
          )}
          {showPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={toggleStartDatePicker}>
                <Text style={styles.smallButton}> Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSDate}>
                <Text style={styles.smallButton}> Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.labelText}>Enter the last day of your trip</Text>
          {!showEndPicker && (
            <Pressable onPress={toggleEndDatePicker}>
              <TextInput
                placeholder={chosenEndDate}
                editable={false}
                onPressIn={toggleEndDatePicker}
                style={styles.input}
                placeholderTextColor="#ffffff"
              />
            </Pressable>
          )}

          {showEndPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={endDate}
              onChange={onChangeEndDate}
              style={styles.DateTimePicker}
            />
          )}
          {showEndPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={toggleEndDatePicker}>
                <Text style={styles.smallButton}> Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSEndDate}>
                <Text style={styles.smallButton}> Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={navigateToCalendar}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create New Trip</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
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
  datePicker: {
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  DateTimePicker: {
    height: 100,
    marginTop: -5,
    backgroundColor: "#d1ffa060",
  },
  smallButton: {
    color: "white",
    fontSize: 17,
    marginHorizontal: 10,
  },
});

export default NewTripScreen;

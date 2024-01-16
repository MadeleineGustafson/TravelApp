import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Countdown from "./countdown";
import IconBar from "./IconBar";

function CalendarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tripData: routeTripData, startDate, endDate } = route.params || {};
  const [tripData, setTripData] = useState(routeTripData || {});

  useEffect(() => {
    const fetchStoredTripData = async () => {
      try {
        // Retrieve trip ID from navigation params
        const { tripId } = route.params || {};

        // Fetch trip data using the trip ID
        const storedTripData = await AsyncStorage.getItem(`tripData:${tripId}`);

        if (storedTripData) {
          setTripData(JSON.parse(storedTripData));
        }
      } catch (error) {
        console.error("Error fetching trip data from AsyncStorage:", error);
      }
    };

    fetchStoredTripData();
  }, [route.params]); // Run the effect when route params change

  const handleAddTodoPress = () => {
    navigation.navigate("TodoPage");
  };

  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  const renderDay = (day) => {
    const isToday = day.dateString === dateString;
    return <Text style={[styles.day, isToday && styles.today]}>{day.day}</Text>;
  };

  const handleBackToNewTripPress = () => {
    navigation.navigate("newTrip");
  };

  const convertToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const createDateRange = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dateRange.push(convertToYYYYMMDD(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRange;
  };

  const markedDates = {};
  if (tripData.startDate && tripData.endDate) {
    const start = convertToYYYYMMDD(tripData.startDate);
    const end = convertToYYYYMMDD(tripData.endDate);
    const dateRange = createDateRange(start, end);
    dateRange.forEach((date, index) => {
      markedDates[date] = {
        color: "grey",
        textColor: "white",
        ...(index === 0 && { startingDay: true }),
        ...(index === dateRange.length - 1 && { endingDay: true }),
      };
    });
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {tripData.name && tripData.destination && (
            <Text style={styles.detailText}>
              {tripData.name}'s trip to {tripData.destination}!
            </Text>
          )}
        </View>
        <IconBar />
        <View style={styles.navContainer}>
          <Pressable
            onPress={handleBackToNewTripPress}
            style={styles.backButtonPressable}
          >
            <MaterialCommunityIcons
              name="playlist-edit"
              size={15}
              color="#163532"
            />
            <Text style={styles.backButton}>Change dates</Text>
          </Pressable>
        </View>

        <Calendar
          style={styles.calendar}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          renderDay={renderDay}
          markingType={"period"}
          markedDates={markedDates}
        />

        <View style={styles.addTodoContainer}>
          <Pressable
            onPress={handleAddTodoPress}
            style={styles.addTodoPressable}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={35}
              color="#163532"
            />
            <Text style={styles.addButton}>Plan your day</Text>
          </Pressable>
        </View>

        <Countdown startDate={tripData.startDate} endDate={tripData.endDate} />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  countdown: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  detailText: {
    fontSize: 35,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
  day: {
    textAlign: "center",
    fontSize: 18,
  },
  today: {
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  container: {
    alignItems: "center",
  },
  addButton: {
    fontSize: 18,
    color: "#163532",
    marginTop: 10,
  },
  backButton: {
    fontSize: 13,
    color: "grey",
    marginTop: 10,
  },
});

export default CalendarScreen;

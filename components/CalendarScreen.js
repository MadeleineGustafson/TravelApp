import React from "react";
import { StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

function CalendarScreen() {
  const today = new Date(); // Get today's date
  const dateString = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

  const renderDay = (day, item) => {
    // Check if the day being rendered matches today's date
    const isToday = day.dateString === dateString;

    return <Text style={[styles.day, isToday && styles.today]}>{day.day}</Text>;
  };

  return (
    <Calendar
      style={{
        marginTop: 50,
      }}
      // Callback that gets called when the user selects a day
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Custom render function for each day
      renderDay={renderDay}
      // Other calendar configurations...

      markingType={"period"}
      markedDates={{
        "2024-01-15": { marked: true, dotColor: "purple" },
        "2024-01-16": { marked: true, dotColor: "purple" },
        "2024-01-21": {
          startingDay: true,
          color: "#50cebb",
          textColor: "white",
        },
        "2024-01-22": { color: "#70d7c7", textColor: "white" },
        "2024-01-23": {
          color: "#70d7c7",
          textColor: "white",
          marked: true,
          dotColor: "purple",
        },
        "2024-01-24": { color: "#70d7c7", textColor: "white" },
        "2024-01-25": { endingDay: true, color: "#50cebb", textColor: "white" },
      }}
    />
  );
}

const styles = StyleSheet.create({
  day: {
    textAlign: "center",
    fontSize: 18,
  },
  today: {
    fontWeight: "bold",
    color: "red", // You can adjust the color for today's date
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
    color: "blue",
    marginTop: 10,
  },
});

export default CalendarScreen;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState([]);
  const currentDate = new Date(); // Get current date

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(
          `https://sholiday.faboul.se/dagar/v2.1/${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
          }`
        );
        const data = await response.json();
        setCalendarData(data.dagar);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, [currentDate]);

  // Function to render the calendar
  const renderCalendar = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.monthTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <View style={styles.daysContainer}>
          {calendarData.map((day) => (
            <View key={day.datum} style={styles.dayContainer}>
              <Text style={styles.dayText}>
                {new Date(day.datum).getDate()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return <View>{renderCalendar()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dayContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    margin: 5,
    minWidth: 40,
    alignItems: "center",
  },
  dayText: {
    fontSize: 18,
  },
});

export default CalendarComponent;

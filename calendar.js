import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

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

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const generateCalendar = () => {
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

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const startingIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const totalBoxes = startingIndex + daysInMonth;
    const totalRows = Math.ceil(totalBoxes / 7);
    const days = [];

    for (let i = 0; i < totalRows * 7; i++) {
      if (i < startingIndex || i >= startingIndex + daysInMonth) {
        days.push(
          <View key={`empty_${i}`} style={styles.dayContainer}>
            <Text style={styles.dayText}>{""}</Text>
          </View>
        );
      } else {
        days.push(
          <View key={`day_${i}`} style={styles.dayContainer}>
            <Text style={styles.dayText}>{i - startingIndex + 1}</Text>
          </View>
        );
      }
    }
    if (days.length <= 34) {
      days.push(
        <View key={`empty_end`} style={styles.dayContainer}>
          <Text style={styles.dayText}>{""}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.monthTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <View style={styles.daysContainer}>{days}</View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View>{generateCalendar()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "18rem",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "28rem",
  },
  container: {
    alignItems: "center",
    //width: "80%",
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
    width: "90%",
    padding: 5, // Optional padding between boxes
  },

  dayContainer: {
    width: "14%", // Set each day container to occupy approximately 1/7th of the row
    aspectRatio: 1, // Ensure boxes maintain a square shape
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 5,
  },
  dayText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 25,
    color: "green",
  },
});

export default CalendarComponent;

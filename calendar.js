import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  // hämta api
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

  // Klicka till tidigare månad
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // KLicka till nästa månad
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Antal veckodagar
  const generateDaysOfWeek = () => {
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
    return daysOfWeek.map((day, index) => (
      <View key={`dayOfWeek_${index}`} style={styles.dayOfWeek}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
    ));
  };

  // Antal månader
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

    // räkna ut tomma boxar

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
        <View style={styles.daysOfWeekContainer}>{generateDaysOfWeek()}</View>
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
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  container: {
    alignItems: "center",
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
  daysOfWeekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  dayOfWeek: {
    width: "14%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CalendarComponent;

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
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <Text>Current Month</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text>{">"}</Text>
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
    marginTop: 50,
    width: "18rem",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "28rem",
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    width: "100%",
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
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 18,
  },
});

export default CalendarComponent;

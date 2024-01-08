import { useNavigation, useRoute } from "@react-navigation/native";
import { React } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

function CalendarScreen() {
  const navigation = useNavigation();
  const handleAddTodoPress = () => {
    // Navigate to the TodoPage when the "Add Todo" button is pressed
    navigation.navigate("TodoPage");
  };
  const today = new Date(); // Get today's date
  const dateString = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

  const renderDay = (day) => {
    // Check if the day being rendered matches today's date
    const isToday = day.dateString === dateString;

    return <Text style={[styles.day, isToday && styles.today]}>{day.day}</Text>;
  };

  const route = useRoute();
  const { tripData } = route.params || {}; // Retrieve tripData from route params

  // Retrieve departureDate and arrivalDate from tripData
  const { name, destination, departureDate, arrivalDate } = tripData || {};

  // Function to convert date string to 'YYYY-MM-DD' format
  const convertToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Mark the departureDate and arrivalDate on the Calendar
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

  // Mark the period between departureDate and arrivalDate on the Calendar
  const markedDates = {};
  if (departureDate && arrivalDate) {
    const start = convertToYYYYMMDD(departureDate);
    const end = convertToYYYYMMDD(arrivalDate);
    const dateRange = createDateRange(start, end);
    dateRange.forEach((date) => {
      markedDates[date] = { color: "purple", textColor: "white" };
    });
    markedDates[start].startingDay = true;
    markedDates[end].endingDay = true;
  }

  return (
    <>
      <Text style={styles.titleText}>This is </Text>
      {name && <Text style={styles.detailText}>{name}s</Text>}
      {destination && (
        <Text style={styles.detailText}>
          trip to {destination}, let's plan it!
        </Text>
      )}
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
        markedDates={markedDates}
      />
      <Pressable onPress={handleAddTodoPress}>
        <Text style={styles.addButton}>Add Todo</Text>
      </Pressable>
    </>
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

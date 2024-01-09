import { useNavigation, useRoute } from "@react-navigation/native";
import { React } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import IconBar from "./IconBar";

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
  const { name, destination, startDate, endDate } = tripData || {};
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

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
  if (startDate && endDate) {
    const start = convertToYYYYMMDD(startDate);
    const end = convertToYYYYMMDD(endDate);
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 65,
          padding: 30,
        }}
      >
        {name && destination && (
          <Text style={styles.detailText}>
            {name}'s trip to {destination}!
          </Text>
        )}
      </View>
      <IconBar />
      <Calendar
        style={{
          marginTop: 50,
        }}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        renderDay={renderDay}
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
    color: "blue",
    marginTop: 10,
  },
});

export default CalendarScreen;

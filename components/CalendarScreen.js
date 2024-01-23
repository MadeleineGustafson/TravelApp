import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTripContext } from "../contexts/TripContext";
import Countdown from "./countdown";
import IconBar from "./IconBar";
import TodoComponent from "./TodoComponent";

function CalendarScreen() {
  const { getTrip, getTodoData } = useTripContext();
  const navigation = useNavigation();
  const [showTodoList, setShowTodoList] = useState(false);

  const route = useRoute();
  const { tripData: routeTripData, startDate, endDate } = route.params || {};
  const [tripData, setTripData] = useState(routeTripData || {});
  const [selectedDateMarked, setSelectedDateMarked] = useState({});
  const [todosDates, setTodosDates] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleTodoList = () => {
    setShowTodoList((prevShowTodoList) => !prevShowTodoList);
  };

  useEffect(() => {
    const fetchStoredTripData = async () => {
      try {
        const { tripId } = route.params || {};
        const storedTripData = await getTrip(tripId);

        if (storedTripData) {
          setTripData(storedTripData);

          // Fetch and set todos for the trip
          const todos = await getTodoData(tripId);
          setTodoData(todos);
        }
      } catch (error) {
        console.error("Error fetching trip data from AsyncStorage:", error);
      }
    };

    fetchStoredTripData();
  }, [route.params, getTrip, getTodoData]);

  // Use useEffect to load todos when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const { tripId } = tripData;
        const todos = await getTodoData(tripId);
        setTodoData(todos);
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };

    // Load todos when the component mounts
    loadTodos();
  }, [tripData, getTodoData]);

  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  const renderDay = (day) => {
    const isToday = day.dateString === dateString;
    return <Text style={[styles.day, isToday && styles.today]}>{day.day}</Text>;
  };

  const handleBackToNewTripPress = () => {
    navigation.navigate("newTrip");
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);

    if (!todosDates.includes(selectedDate)) {
      setTodosDates((prevDates) => [...prevDates, selectedDate]);
      updateMarkedDates(selectedDate);
    }

    setSelectedDateMarked({
      [selectedDate]: { selected: true, textColor: "#000" },
    });
    setShowTodoList(true);
  };

  const updateMarkedDates = (date) => {
    setSelectedDateMarked((prevMarkedDates) => ({
      ...prevMarkedDates,
      [date]: { selected: true, marked: true, dotColor: "#B726DC" },
    }));
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
        color: "#D1FFA0",
        textColor: "#163532",
        ...(index === 0 && { startingDay: true }),
        ...(index === dateRange.length - 1 && { endingDay: true }),
      };
    });
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: "#163532" }}>
        <View style={styles.countdownContainer}>
          <Countdown startDate={new Date(tripData.startDate)} />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 65,
            padding: 30,
          }}
        >
          <View style={styles.container}>
            {tripData.name && tripData.destination && (
              <Text style={styles.detailText}>
                {tripData.name}'s trip to {tripData.destination}!
              </Text>
            )}
          </View>
          <IconBar tripId={tripData.id} />
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
            style={styles.styleCalendar}
            theme={{
              calendarBackground: "#163532",
              monthTextColor: "white",
              fontFamily: "Poppins-Regular",
              textMonthFontSize: 22,
              textMonthFontFamily: "Poppins-Bold",
              arrowColor: "white",
              dayTextColor: "#D1FFA0",
              todayBackgroundColor: "#B726DC",
            }}
            onDayPress={handleDayPress}
            renderDay={renderDay}
            markingType={"period"}
            markedDates={{
              ...markedDates,
            }}
          />

          {/* Display selected date */}
          {selectedDate && (
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateText}>{selectedDate}</Text>
            </View>
          )}

          <View style={styles.toggleButtonContainer}>
            <Pressable onPress={toggleTodoList} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>
                {showTodoList ? "Hide Todos" : "Show Todos"}
              </Text>
            </Pressable>
          </View>

          {/* Conditionally render the TodoComponent */}
          {showTodoList && (
            <TodoComponent tripId={tripData.id} selectedDate={selectedDate} />
          )}

          <View style={styles.addTodoContainer}>
            <Text style={styles.addButton}>Press a date to add a todo</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  countdownContainer: {
    position: "absolute",
    top: 10,
    right: 10,
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
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  styleCalendar: {
    marginTop: 50,
    width: 300,
    backgroundColor: "#163532",
    fontFamily: "Poppins-Bold",
  },
  day: {
    textAlign: "center",
    fontSize: 18,
  },
  today: {
    fontWeight: "bold",
  },
  isToday: {
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
    fontFamily: "Poppins-Regular",
    color: "#163532",
    marginTop: 10,
  },
  backButton: {
    fontSize: 13,
    color: "grey",
    marginTop: 10,
  },
  selectedDateText: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 18,
  },
  plans: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 22,
  },
  toggleButtonText: {
    backgroundColor: "purple",
  },
});

export default CalendarScreen;

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTripContext } from "../contexts/TripContext";
import Countdown from "./countdown";
import IconBar from "./IconBar";
import ToDoList from "./ToDoList";

function CalendarScreen() {
  const { getTrip } = useTripContext();
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [showTodoList, setShowTodoList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const route = useRoute();
  const { tripData: routeTripData, startDate, endDate } = route.params || {};
  const [tripData, setTripData] = useState(routeTripData || {});
  const [selectedDateMarked, setSelectedDateMarked] = useState({});

  useEffect(() => {
    const fetchStoredTripData = async () => {
      try {
        const { tripId } = route.params || {};
        const storedTripData = await getTrip(tripId);

        if (storedTripData) {
          setTripData(storedTripData);
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

  const handleTodoPress = (todo) => {
    // Handle the press on a todo, if needed
    console.log(`Todo pressed: ${todo.text}`);
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

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);

    // Mark the selected date with a green circle
    setSelectedDateMarked({
      [selectedDate]: { selected: true, textColor: "#B726DC" },
    });

    setShowTodoList(true);
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

  const renderTodosForDate = () => {
    if (selectedDate) {
      const todosForSelectedDate = todos.filter(
        (todo) => todo.date === selectedDate
      );

      if (todosForSelectedDate.length > 0) {
        return (
          <View style={{ backgroundColor: "#163532" }}>
            <Text style={styles.todoHeader}>Todos for {selectedDate}:</Text>
            <FlatList
              data={todosForSelectedDate}
              keyExtractor={(item) => item.text}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTodoPress(item)}>
                  <Text style={styles.todoItem}>{item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      }
    }

    return null;
  };

  return (
    <ScrollView style={{ backgroundColor: "#163532" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 30,
          marginBottom: 0,
          marginTop: 60,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Start")}>
          <View>
            <Ionicons name="arrow-back" size={40} color="#D1FFA0" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Start")}>
          <View>
            <Image
              source={require("../assets/tp.logo.small.png")}
              style={{
                opacity: "0.5",
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <View style={styles.container}>
            {tripData.name && tripData.destination && (
              <Text style={styles.detailText}>
                {tripData.name}'s trip to {tripData.destination}
              </Text>
            )}
          </View>

          <View style={styles.countdownContainer}>
            <Countdown startDate={new Date(tripData.startDate)} />
          </View>
        </View>

        <IconBar tripId={tripData.id} />
        <View style={styles.navContainer}></View>

        <Calendar
          style={styles.styleCalendar}
          theme={{
            calendarBackground: "#163532",
            monthTextColor: "#EDF2E1",
            fontFamily: "Poppins-Regular",
            textMonthFontSize: 22,
            textMonthFontFamily: "Poppins-Regular",
            arrowColor: "white",
            dayTextColor: "#D1FFA0",
            todayBackgroundColor: "#B726DC",
          }}
          onDayPress={handleDayPress}
          renderDay={renderDay}
          markingType={"period"}
          markedDates={{
            ...markedDates,
            ...selectedDateMarked,
          }}
        />

        <View style={styles.addTodoContainer}>
          <Pressable
            onPress={handleAddTodoPress}
            style={styles.addTodoPressable}
          >
            {/* <MaterialCommunityIcons
              name="plus-circle-outline"
              size={35}
              color="#163532"
              /> */}
            <Text style={styles.addButton}>Press a date to add a todo</Text>
          </Pressable>
        </View>

        {showTodoList && <ToDoList selectedDate={selectedDate} />}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  countdownContainer: {
    //marginTop: 15,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    marginTop: 10,
  },
  detailText: {
    fontSize: 27,
    marginLeft: 10,
    //marginTop: 10,
    //textAlign: "center",
    fontFamily: "Poppins-Bold",
    color: "#EDF2E1",
    //marginRight: 10,
    padding: 10,
  },
  styleCalendar: {
    marginTop: 20,
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
    //alignItems: "space-between",
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
});

export default CalendarScreen;

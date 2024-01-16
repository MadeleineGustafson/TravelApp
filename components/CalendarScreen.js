import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import IconBar from "./IconBar";
import ToDoList from "./ToDoList";
import Countdown from "./countdown";

function CalendarScreen() {
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
      const todosForSelectedDate = todos.filter((todo) => todo.date === selectedDate);
  
      if (todosForSelectedDate.length > 0) {
        return (
          <View>
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
    };
  
    return null;
  };

  return (
    <>
      <ScrollView>
        <View>
        <Countdown
            startDate={startDate} 
            endDate={endDate}
            style={styles.countdown} 
            />
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

        <Calendar style={styles.styleCalendar}
          theme={{
            calendarBackground: "#163532",
            monthTextColor: "white",
            textMonthFontSize: 22,
            arrowColor: "white",
            dayTextColor: "#D1FFA0",
        
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
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={35}
              color="#163532"
              />
            <Text style={styles.addButton}>Plan your day</Text>
          </Pressable>
        </View>

        {showTodoList && <ToDoList selectedDate={selectedDate} />}
      </View>
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
  styleCalendar: {
    marginTop: 50,
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

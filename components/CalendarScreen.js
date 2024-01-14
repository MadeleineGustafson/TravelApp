import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const { tripData, startDate, endDate } = route.params || {}; // Retrieve tripData, startDate, and endDate from route params
  const today = new Date(); // Get today's date
  const dateString = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

  const renderDay = (day) => {
    // Check if the day being rendered matches today's date
    const isToday = day.dateString === dateString;

    return <Text style={[styles.day, isToday && styles.today]}>{day.day}</Text>;
  };

  const handleBackToNewTripPress = () => {
    // Navigate back to the "newTrip" page
    navigation.navigate("newTrip");
  };

  // Retrieve departureDate and arrivalDate from tripData
  const {
    name,
    destination,
    startDate: tripStartDate,
    endDate: tripEndDate,
  } = tripData || {};
  console.log("startDate:", tripStartDate);
  console.log("endDate:", tripEndDate);

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

  const handleAddTodoPress = () => {
    // Navigate to the TodoPage when the "Add Todo" button is pressed
    navigation.navigate("TodoPage", {
      selectedDate,
      addTodo,
    });
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    setShowTodoList(true);
  };

  const handleTodoPress = (todo) => {
    // Handle the press on a todo, if needed
    console.log(`Todo pressed: ${todo.text}`);
  };

  const addTodo = (todoText) => {
    const newTodo = { date: selectedDate, text: todoText };
    setTodos([...todos, newTodo]);
  };

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

  // const handleDayPress = (day) => {
  //   setSelectedDate(day.dateString);
  //   setShowTodoList(true); // Show the TodoList component
  //   // Navigate to TodoPage when a date is selected
  //   navigation.navigate("TodoPage");
  // };

  return (
    <>
      <ScrollView>
        <View >
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
          onDayPress={handleDayPress}
          renderDay={renderDay}
          markingType={"custom"}
          markedDates={{
            ...markedDates,
            [selectedDate]: { selected: true, selectedColor: "#163532" },
          }}
        />
        <Pressable onPress={handleAddTodoPress}>
          <Text style={styles.addButton}>Add Todo</Text>
        </Pressable>

        <Pressable onPress={handleBackToNewTripPress}>
          <Text style={styles.backButton}>Change dates</Text>
        </Pressable>

        {/* <Text style={styles.sectionTitle}>Todos for {selectedDate}</Text> */}

        {showTodoList && <ToDoList selectedDate={selectedDate} />}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  countdown: {
    position: 'absolute',
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
  backButton: {
    fontSize: 18,
    color: "blue",
    marginTop: 10,
  },
});

export default CalendarScreen;

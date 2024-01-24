import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTripContext } from "../contexts/TripContext";

// Function to get current time
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

const TodoComponent = ({ tripId, selectedDate }) => {
  const { getTodoData, saveTodoData } = useTripContext();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [startInput, setStartInput] = useState(getCurrentTime());
  const [endInput, setEndInput] = useState(getCurrentTime());

  useEffect(() => {
    loadTodos();
  }, [tripId, selectedDate]);

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (date) => {
    const formattedTime = date.toLocaleTimeString("sv-SE", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    setSelectedStartTime(formattedTime);
    setStartInput(formattedTime);
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (date) => {
    const formattedTime = date.toLocaleTimeString("sv-SE", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    setSelectedEndTime(formattedTime);
    setEndInput(formattedTime);
    hideEndTimePicker();
  };

  const addTodo = async () => {
    if (todo.trim() !== "" && selectedStartTime && selectedEndTime) {
      const newTodo = {
        id: Date.now().toString(),
        text: todo,  // Store the todo text separately
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        date: selectedDate,
      };

      const existingTodos = (await getTodoData(tripId)) || [];
      const updatedTodos = [...existingTodos, newTodo];
      setTodos(updatedTodos);

      await saveTodoData(tripId, updatedTodos);

      setTodo("");
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      setStartInput(getCurrentTime());
      setEndInput(getCurrentTime());
    }
  };

  const loadTodos = async () => {
    try {
      const allTodos = (await getTodoData(tripId)) || [];
      const todosForSelectedDate = allTodos.filter(
        (todo) => todo.date === selectedDate
      );

      setTodos(todosForSelectedDate);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };
  
  return (
    <ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Enter your todo"
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      <TouchableOpacity onPress={showStartTimePicker}>
      <Text
        style={{
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#D3DFB7"
      }}>Enter start time
      </Text>
      </TouchableOpacity> 

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "transparent",
          borderWidth: 1,
          marginBottom: 10,
          color: "white"
        }}
        placeholder="Enter start time"
        value={startInput}
        onPress={showStartTimePicker}
        onChangeText={(text) => setStartInput(text)}
      />
      <TouchableOpacity onPress={showEndTimePicker}>
        <Text
          style={{
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          color: "#D3DFB7"
          }}>Enter end time
        </Text>
      </TouchableOpacity> 

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "transparent",
          borderWidth: 1,
          marginBottom: 10,
          color: "white"
        }}
        placeholder="Enter end time"
        value={endInput}
        onChangeText={(text) => setEndInput(text)}
      />
      <TouchableOpacity onPress={addTodo}>
        <Text
        style={{
        fontFamily: "Poppins-Regular",
        fontSize: 17,
        color: "white",
      }}> Add todo 
      </Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 17,
                color: "white",
              }}
            >
              {item.text}
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                color: "#D3DFB7",
              }}
            >
              {`${item.startTime} to ${item.endTime}`}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default TodoComponent;

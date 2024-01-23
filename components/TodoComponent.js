import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
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
        text: `${todo} - ${selectedStartTime} to ${selectedEndTime}`,
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
    <View>
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
      <Button title="Enter start time" onPress={showStartTimePicker} />
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
        }}
        placeholder="Enter start time"
        value={startInput}
        onPress={showStartTimePicker}
        onChangeText={(text) => setStartInput(text)}
      />
      <Button title="Enter end time" onPress={showEndTimePicker} />
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
        }}
        placeholder="Enter end time"
        value={endInput}
        onChangeText={(text) => setEndInput(text)}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 17,
          color: "white",
        }}
      >
        {" "}
        Plans for the day:
      </Text>
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
          </View>
        )}
      />
    </View>
  );
};

export default TodoComponent;

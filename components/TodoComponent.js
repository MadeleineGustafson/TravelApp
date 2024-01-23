import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTripContext } from "../contexts/TripContext";

const TodoComponent = ({ tripId, selectedDate }) => {
  const { getTodoData, saveTodoData } = useTripContext();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const loadTodos = async () => {
    try {
      // Load todos for the specific tripId
      const allTodos = (await getTodoData(tripId)) || [];

      // Filter todos based on the selected date
      const todosForSelectedDate = allTodos.filter(
        (todo) => todo.date === selectedDate
      );

      // Use the callback form of setTodos to ensure working with the latest state
      setTodos(todosForSelectedDate);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [tripId, selectedDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Format the selected time as needed
    const formattedTime = date.toLocaleTimeString("sv-SE", {
      hour: "numeric",
      minute: "numeric",
      hour24: true,
    });

    setSelectedTime(formattedTime);
    hideDatePicker();
  };

  const addTodo = async () => {
    if (todo.trim() !== "" && selectedTime) {
      const newTodo = {
        id: Date.now().toString(),
        text: `${todo} - ${selectedTime}`,
        date: selectedDate,
      };

      // Load existing todos
      const existingTodos = (await getTodoData(tripId)) || [];

      // Append the new todo to the existing todos
      const updatedTodos = [...existingTodos, newTodo];
      setTodos(updatedTodos);

      // Save updatedTodos to AsyncStorage
      await saveTodoData(tripId, updatedTodos);

      setTodo("");
      setSelectedTime(null);
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
      <Button title="Show Time Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TodoComponent;

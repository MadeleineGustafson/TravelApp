import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
        style={styles.input}
        placeholder="Enter your todo"
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      {/* Wrap "Enter start time" and "Enter end time" in a View with horizontal layout */}
      <View style={styles.timeInputContainer}>
        <TouchableOpacity onPress={showStartTimePicker}>
          <Text style={styles.timeInputLabel}>Enter start time</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.timeInput}
          placeholder="Enter start time"
          value={startInput}
          onPress={showStartTimePicker}
          onChangeText={(text) => setStartInput(text)}
        />
      </View>

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />

       {/* "Enter end time" label and text input */}
       <View style={styles.timeInputContainer}>
        <TouchableOpacity onPress={showEndTimePicker}>
          <Text style={styles.timeInputLabel}>Enter end time</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.timeInput}
          placeholder="Enter end time"
          value={endInput}
          onChangeText={(text) => setEndInput(text)}
        />
      </View>

        
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />
   
      <TouchableOpacity onPress={() => addTodo()}>
         <View style={styles.addWrapper}>
           <Text style={styles.addText}>+</Text>
         </View>
      </TouchableOpacity>


      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 17,
                    color: "#163532",
                  }}
                >
                  {item.text}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 14,
                    color: "#163532",
                  }}
                >
                  {`${item.startTime} to ${item.endTime}`}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#D3DFB7",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: 300,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#D3DFB7",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 300,
    fontFamily: "Poppins-Regular",
  },
  timeInputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#D3DFB7",
  },
  timeInput: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    color: "white",
    flex: 1, // Take up remaining space
    marginLeft: 10, // Add some space between label and input
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#D3DFB7",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
  },
})

export default TodoComponent;

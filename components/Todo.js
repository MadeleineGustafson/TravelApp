import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTripContext } from "../contexts/TripContext";

const Todo = ({ todo, onDelete, onEdit, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [loadedData, setLoadedData] = useState(false);
  const [loadedTodo, setLoadedTodo] = useState(null);
  const { getTodoData, saveTododata } = useTripContext();

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        // Fetch the todo data for the specific date
        const todos = await getTodoData(/* Provide the tripId and date here */);
        const loadedTodo = todos.find((t) => t.id === todo.id); // Assuming todo has an 'id' property

        if (loadedTodo) {
          setLoadedTodo(loadedTodo);
        }
      } catch (error) {
        console.error("Error fetching todo data:", error);
      } finally {
        setLoadedData(true);
      }
    };

    if (!loadedData) {
      fetchTodoData();
    }
  }, [loadedData, todo.id, getTodoData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = () => {
    onEdit(editedText);
    onSave(editedText); // Pass the edited text to the onSave handler
    handleEditToggle();
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={(text) => setEditedText(text)}
          />
        ) : (
          <View>
            <Text style={styles.itemText}>{todo.text}</Text>
            <View style={styles.timeContainer}>
              {todo.startTime && (
                <Text
                  style={styles.timeText}
                >{`Start: ${todo.startTime}`}</Text>
              )}
              {todo.endTime && (
                <Text style={styles.timeText}>{` - End: ${todo.endTime}`}</Text>
              )}
              {todo.selectedDate && (
                <Text
                  style={styles.timeText}
                >{` - Date: ${todo.selectedDate}`}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleEditSave}>
            <Text style={styles.saveText}>
              <Entypo name="check" size={20} color="#163532" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>
              <Feather name="edit" size={18} color="#163532" />
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>
            <FontAwesome5 name="trash" size={18} color="#163532" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  itemText: {
    maxWidth: "100%",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    color: "#163532",
  },
  timeText: {
    maxWidth: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#163532",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: "#D3DFB7",
  },
  propsTime: {
    fontSize: 28,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  editText: {
    color: "blue",
    marginRight: 20,
  },
  saveText: {
    color: "green",
    marginLeft: -40,
  },
  deleteText: {
    color: "red",
  },
  dateText: {
    color: "gray",
    fontSize: 12,
  },
});

export default Todo;

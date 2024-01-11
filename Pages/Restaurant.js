import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotesScreen from "../components/NotesScreen";

function Restaurant() {
  const [restaurantNotes, setRestaurantNotes] = useState([]); // State for restaurant-specific notes
  const navigation = useNavigation();

  // Function to save a restaurant note
  const onSaveRestaurantNote = (selectedNote, title, content) => {
    if (selectedNote) {
      // Update existing note logic
      const updatedNotes = restaurantNotes.map((note) =>
        note.id === selectedNote.id ? { ...note, title, content } : note
      );
      setRestaurantNotes(updatedNotes);
    } else {
      // Add new note logic
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setRestaurantNotes([...restaurantNotes, newNote]);
    }
  };

  // Function to edit a restaurant note (you can modify this based on your requirements)
  const onEditRestaurantNote = () => {
    // Logic for editing restaurant notes
    // For example: handle opening the modal for editing
    // ...
  };

  // Function to delete a restaurant note
  const handleDeleteRestaurantNote = (note) => {
    const updatedNotes = restaurantNotes.filter((item) => item.id !== note.id);
    setRestaurantNotes(updatedNotes);
  };

  return (
    <>
      <View style={{ justifyContent: "flex-start", margin: 20, marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("calendar")} // Navigate to CalendarScreen
        >
          <MaterialCommunityIcons name="close" size={30} color="#163532" />
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", marginTop: 10, margin: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <MaterialCommunityIcons name="food" size={70} color="#163532" />
          <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
            <Text style={styles.title}>Restaurants</Text>
            <Text style={styles.text}>
              On this page, you can save links to restaurants you want to
              visit during your travels!
            </Text>
          </View>
        </View>

        <NotesScreen
          notesData={restaurantNotes}
          onSaveNote={onSaveRestaurantNote}
          onEditNote={onEditRestaurantNote}
          onDeleteNote={(note) => handleDeleteRestaurantNote(note)}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    //marginBottom: 10,
    color: "#163532",
  },
  text: {
    fontSize: 16,
    //padding: 10,
    //marginBottom: 10,
    color: "#333",
  },
});

export default Restaurant;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotesScreen from "../components/NotesScreen";

function Sights() {
  const [sightsNotes, setSightsNotes] = useState([]); // State for sights-specific notes
  const navigation = useNavigation();

  // Function to save a sights note
  const onSaveSightsNote = (selectedNote, title, content) => {
    if (selectedNote) {
      // Update existing note logic
      const updatedNotes = sightsNotes.map((note) =>
        note.id === selectedNote.id ? { ...note, title, content } : note
      );
      setSightsNotes(updatedNotes);
    } else {
      // Add new note logic
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setSightsNotes([...sightsNotes, newNote]);
    }
  };

  // Function to edit a sights note (you can modify this based on your requirements)
  const onEditSightsNote = () => {
    // Logic for editing sights notes
    // For example: handle opening the modal for editing
    // ...
  };

  // Function to delete a sights note
  const handleDeleteSightsNote = (note) => {
    const updatedNotes = sightsNotes.filter((item) => item.id !== note.id);
    setSightsNotes(updatedNotes);
  };

  return (
    <>
      <View style={{ justifyContent: "flex-start", margin: 20, marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.navigate("calendar")}>
          <MaterialCommunityIcons name="close" size={30} color="#163532" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "center", marginTop: 10, margin: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
          <MaterialCommunityIcons name="ferris-wheel" size={70} color="#163532" />
          <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
            <Text style={styles.title}>Sights</Text>
            <Text style={styles.text}>
              On this page, you can save information or links to sights and attractions for your trip!
            </Text>
          </View>
        </View>

        <NotesScreen
          notesData={sightsNotes}
          onSaveNote={onSaveSightsNote}
          onEditNote={onEditSightsNote}
          onDeleteNote={(note) => handleDeleteSightsNote(note)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#163532",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default Sights;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotesScreen from "../components/NotesScreen";
import { useTripContext } from "../contexts/TripContext";

function Restaurant({ route }) {
  const navigation = useNavigation();
  const { tripId } = route.params;
  const { saveRestaurantNotes, getRestaurantNotes } = useTripContext();
  const [restaurantNotes, setRestaurantNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getRestaurantNotes(tripId);
        setRestaurantNotes(notes);
      } catch (error) {
        console.error("Error fetching restaurant notes:", error);
      }
    };

    fetchNotes();
  }, [tripId]);

  const onSaveRestaurantNote = async (selectedNote, title, content) => {
    try {
      const newNote = {
        id: selectedNote ? selectedNote.id : Date.now(),
        title,
        content,
      };

      // Retrieve existing notes for the trip
      const existingNotes = await getRestaurantNotes(tripId);

      // Update or add the new note
      const updatedNotes = selectedNote
        ? existingNotes.map((note) =>
            note.id === selectedNote.id ? { ...note, ...newNote } : note
          )
        : [...existingNotes, { ...newNote }];

      // Save the updated notes
      await saveRestaurantNotes(tripId, updatedNotes);

      // Update the state with the new notes
      setRestaurantNotes(updatedNotes);
    } catch (error) {
      console.error("Error saving restaurant notes:", error);
    }
  };

  // Function to delete a restaurant note
  const handleDeleteRestaurantNote = async (note) => {
    try {
      // Retrieve existing notes for the trip
      const existingNotes = await getRestaurantNotes(tripId);

      // Filter out the note to be deleted
      const updatedNotes = existingNotes.filter((item) => item.id !== note.id);

      // Save the updated notes
      await saveRestaurantNotes(tripId, updatedNotes);

      // Update the state with the new notes
      setRestaurantNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting restaurant note:", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#163532" }}>
      <View
        style={{
          justifyContent: "flex-start",
          margin: 20,
          marginTop: 40,
          backgroundColor: "#163532",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("calendar")} // Navigate to CalendarScreen
        >
          <MaterialCommunityIcons name="close" size={30} color="#EDF2E1" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 0,
          margin: 20,
          backgroundColor: "#163532",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            margin: 10,
            marginLeft: 21,
          }}
        >
          <MaterialCommunityIcons name="food" size={75} color="#D1FFA0" />
          <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
            <Text style={styles.title}>Restaurants</Text>
            <Text style={styles.text}>
              Save information or links to restaurants you want to visit during
              your travels!
            </Text>
          </View>
        </View>

        <NotesScreen
          notesData={restaurantNotes}
          onSaveNote={onSaveRestaurantNote}
          onDeleteNote={(note) => handleDeleteRestaurantNote(note)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#D1FFA0",
  },
  text: {
    fontSize: 16,
    color: "#EDF2E1",
  },
});

export default Restaurant;

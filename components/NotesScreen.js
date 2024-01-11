import React, { useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NotesScreen = ({
  notesData,
  titleText,
  descriptionText,
  onSaveNote,
  onEditNote,
}) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveNote = () => {
    if (selectedNote) {
      // If a note is selected, update it
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {
      // If no note is selected, add a new note
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes, newNote]);
    }
    onSaveNote(selectedNote, title, content);
    setTitle("");
    setContent("");
    setModalVisible(false);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
    onEditNote();
  };

  // Function to handle deleting a note

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.title}>{descriptionText}</Text>
      <ScrollView style={styles.noteList}>
        {notesData.map((note) => (
          <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteSmallText}>{note.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setContent("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Note title input */}
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Note content input */}
          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Enter note content"
            value={content}
            onChangeText={setContent}
          />

          {/* Buttons for saving, canceling, and deleting */}
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSaveNote} color="#007BFF" />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#FF3B30"
            />
            {selectedNote && <Button title="Delete" color="#FF9500" />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
    color: "black",
    width: "100%",
    paddingLeft: 10,
    borderRadius: 8,
  },
  noteSmallText: {
    fontSize: 12,
    paddingLeft: 10,
  },
  addButton: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#163532",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: "#D1FFA0",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NotesScreen;

import React, { useState } from "react";
import {
  Button,
  Linking,
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
  onDeleteNote,
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
    // Call the onEditNote prop if it exists
    onEditNote && onEditNote(note);
  };

  // Function to handle deleting a note
  const handleDeleteNote = (note) => {
    const updatedNotes = notes.filter((item) => item.id !== note.id);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setModalVisible(false);

    // Use the onDeleteNote prop to update the state in the parent component
    onDeleteNote(note);
  };

  const handleLinkPress = (url) => {
    // Open the link using Linking API
    Linking.openURL(url);
  };

  const isLink = (content) => {
    // Define a regular expression to check if the content starts with "http://" or "https://"
    const linkPattern = /^(http:\/\/|https:\/\/)/;

    return linkPattern.test(content);
  };

  return (
    <View style={styles.container}>
      <View style={styles.littlecontainer}>
        <Text style={styles.title}>{titleText}</Text>
        <Text style={styles.title}>{descriptionText}</Text>
        <ScrollView style={styles.noteList}>
          {notesData.map((note) => (
            <TouchableOpacity
              key={note.id}
              onPress={() => handleEditNote(note)}
            >
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text
                style={[
                  styles.noteSmallText,
                  isLink(note.content) && styles.linkText,
                ]}
                onPress={() => handleLinkPress(note.content)}
              >
                {note.content}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
      </View>
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
            {selectedNote && (
              <Button
                title="Delete"
                onPress={() => handleDeleteNote(selectedNote)}
                style={styles.delete}
              />
            )}
            <Button title="Save" onPress={handleSaveNote} style={styles.save} />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#FF3B30"
            />
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
  littlecontainer: {
    height: 300,
  },
  noteList: {
    flex: 1,
    width: 300,
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: "#EDF2E1",
    fontWeight: "bold",
    width: "100%",
    paddingLeft: 10,
    borderRadius: 8,
  },
  noteSmallText: {
    fontSize: 15,
    paddingLeft: 10,
    marginBottom: 20,
    color: "#EDF2E1",
  },
  addButton: {
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    borderColor: "#D1FFA0",
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    width: 100,
  },
  addButtonText: {
    color: "#D1FFA0",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#163532",
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#EDF2E1",
  },
  contentInput: {
    borderRadius: 20,
    backgroundColor: "#EDF2E1",
    padding: 10,
    marginBottom: 20,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  delete: {
    backgroundColor: "#D1FFA0",
  },
  save: {
    backgroundColor: "#D1FFA0",
    textColor: "#D1FFA0",
  },
});

export default NotesScreen;

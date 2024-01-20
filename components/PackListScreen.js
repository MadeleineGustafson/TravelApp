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
import CheckBox from 'react-native-check-box';

const PackListScreen = () => {
  // State variables
  // Array to store pack items
  const [packItems, setPackItems] = useState([]);

  // Selected pack item for editing
  const [selectedPackItem, setSelectedPackItem] = useState(null);

  // Pack item title
  const [title, setTitle] = useState("");

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle saving a pack item
  const handleSavePackItem = () => {
    if (selectedPackItem) {
      // If a pack item is selected, update it
      const updatedPackItems = packItems.map((item) =>
        item.id === selectedPackItem.id ? { ...item, title } : item
      );
      setPackItems(updatedPackItems);
      setSelectedPackItem(null);
    } else {
      // If no pack item is selected, add a new pack item
      const newPackItem = {
        id: Date.now(),
        title,
        checked: false, // Initialize the checked state to false
      };
      setPackItems([...packItems, newPackItem]);
    }
    setTitle("");
    setModalVisible(false);
  };

  // Function to handle editing a pack item
  const handleEditPackItem = (item) => {
    setSelectedPackItem(item);
    setTitle(item.title);
    setModalVisible(true);
  };

  // Function to handle checking/unchecking a pack item
  const handleToggleCheckbox = (item) => {
    const updatedPackItems = packItems.map((packItem) =>
      packItem.id === item.id ? { ...packItem, checked: !packItem.checked } : packItem
    );
    setPackItems(updatedPackItems);
  };

  // Function to handle deleting a pack item
  const handleDeletePackItem = (item) => {
    const updatedPackItems = packItems.filter(
      (packItem) => packItem.id !== item.id
    );
    setPackItems(updatedPackItems);
    setSelectedPackItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Packing List</Text>

      {/* List of pack items */}
      <ScrollView style={styles.packItemList}>
        {packItems.map((packItem) => (
          <TouchableOpacity
            key={packItem.id}
            onPress={() => handleEditPackItem(packItem)}
          >
            <View style={styles.packItemContainer}>
              <CheckBox style={styles.checkBox}
                onClick={() => handleToggleCheckbox(packItem)}
                isChecked={packItem.checked}
                leftText={"CheckBox"}
            />
              <Text style={styles.packItemTitle}>{packItem.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Pack Item button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Pack Item</Text>
      </TouchableOpacity>

      {/* Modal for creating/editing pack items */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          {/* Pack item title input */}
          <TextInput
            style={styles.input}
            placeholder="Enter pack item title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Buttons for saving, canceling, and deleting */}
          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              onPress={handleSavePackItem}
              color="#007BFF"
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#FF3B30"
            />
            {selectedPackItem && (
              <Button
                title="Delete"
                onPress={() => handleDeletePackItem(selectedPackItem)}
                color="#FF9500"
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#163532",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#D3DFB7",
  },
  packItemList: {
    flex: 1,
  },
  packItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "#D3DFB7"
  },
  packItemTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#D3DFB7",
    height: 40,
    width: "100%",
    padding: 15,
    marginLeft: 5,
  },
  checkBox: {
    flex: 1, 
    padding: 20, 
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3DFB7",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#163532",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PackListScreen;

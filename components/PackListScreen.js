import React, { useEffect, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CheckBox from 'react-native-check-box';
import { useTripContext } from "../contexts/TripContext";

const PackListScreen = ({ route, onSaveItem }) => {
  const { savePackingList, getPackingList } = useTripContext();
  const [packItems, setPackItems] = useState([]);
  const [selectedPackItem, setSelectedPackItem] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { tripId } = route.params;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching trip items for tripId:", tripId);
        const items = await getPackingList(tripId);
        console.log("Fetched trip items:", items);
        setPackItems(items || []); // Ensure items is not undefined
      } catch (error) {
        console.error("Error fetching trip items:", error);
      }
    };

    fetchItems();
  }, [tripId, getPackingList]);

  const handleSavePackItem = () => {
    console.log("Saving pack item...");
  
    // If onSaveItem is a function, call it with the necessary data
    if (typeof onSaveItem === 'function') {
      onSaveItem(selectedPackItem, title, content);
    }
  
    if (selectedPackItem) {
      const updatedPackItems = packItems.map((item) =>
        item.id === selectedPackItem.id ? { ...item, title, checked: selectedPackItem.checked } : item
      );
      setPackItems((prevPackItems) => {
        // Use the state updater function to ensure the correct state
        const newState = updatedPackItems;
        savePackingList(tripId, newState);
        return newState;
      });
      setSelectedPackItem(null);
    } else {
      const newPackItem = {
        id: Date.now(),
        title,
        checked: false,
      };
      setPackItems((prevPackItems) => {
        // Use the state updater function to ensure the correct state
        const newState = [...prevPackItems, newPackItem];
        savePackingList(tripId, newState);
        return newState;
      });
    }
  
    setTitle("");
    setModalVisible(false);
  
    console.log("Pack item saved successfully!");
  };

  const handleToggleCheckbox = (item) => {
    const updatedPackItems = packItems.map((packItem) =>
      packItem.id === item.id ? { ...packItem, checked: !packItem.checked } : packItem
    );
    setPackItems((prevPackItems) => {
      // Use the state updater function to ensure the correct state
      const newState = updatedPackItems;
      savePackingList(tripId, newState);
      return newState;
    });
  };

  const handleEditPackItem = (item) => {
    setSelectedPackItem(item);
    setTitle(item.title);
    setContent(item.content);
    setModalVisible(true);
  };

  const handleDeletePackItem = (item) => {
    const updatedPackItems = packItems.filter(
      (packItem) => packItem.id !== item.id
    );
    setPackItems(updatedPackItems);
    setSelectedPackItem(null);
    setModalVisible(false);
  
    // Corrected line, replace onDeleteItem with onSaveItem
    if (typeof onSaveItem === 'function') {
      onSaveItem(selectedPackItem, title, content);
    }
  
    console.log("Pack item deleted successfully!");
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Packing List</Text>

      <ScrollView style={styles.packItemList}>
        {packItems.map((packItem) => (
          <TouchableOpacity
            key={packItem.id}
            onPress={() => handleEditPackItem(packItem)}
          >
            <View style={styles.packItemContainer}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleToggleCheckbox(packItem)}
                isChecked={packItem.checked}
                tintColor={{true: "white", false: "yellow"}}
                tintColors={{true: "white", false: "yellow"}}
              />
              <Text style={styles.packItemTitle}>{packItem.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Pack Item</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter pack item title"
            value={title}
            onChangeText={setTitle}
          />
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
    fontWeight: "bold",
    color: "#D3DFB7",
    width: "100%",
    marginLeft: 30,
  },
  checkBox: {
    flex: 1, 
    padding: 10, 
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

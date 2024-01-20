import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PackListScreen from "../components/PackListScreen";
import { useTripContext } from "../contexts/TripContext";

function PackListPage({ route }) {
  const navigation = useNavigation();
  const { tripId } = route.params;
  const { saveTripItems, getTripItems } = useTripContext();
  const [tripItems, setTripItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getTripItems(tripId);
        setTripItems(items || []);  // Ensure items is not undefined
      } catch (error) {
        console.error("Error fetching trip items:", error);
      }
    };
    
    fetchItems();
  }, [tripId]);

  const onSaveTripItem = async (selectedItem, title, content) => {
    try {
      const newItem = {
        id: selectedItem ? selectedItem.id : Date.now(),
        title,
        content,
      };

      // Retrieve existing items for the trip
      const existingItems = await getTripItems(tripId);

      // Update or add the new item
      const updatedItems = selectedItem
        ? existingItems.map((item) =>
            item.id === selectedItem.id ? { ...item, ...newItem } : item
          )
        : [...existingItems, { ...newItem }];

      // Save the updated items
      await saveTripItems(tripId, updatedItems);

      // Update the state with the new items
      setTripItems(updatedItems);
    } catch (error) {
      console.error("Error saving trip items:", error);
    }
  };

  const handleDeleteTripItem = async (item) => {
    try {
      // Retrieve existing items for the trip
      const existingItems = await getTripItems(tripId);

      // Filter out the item to be deleted
      const updatedItems = existingItems.filter((i) => i.id !== item.id);

      // Save the updated items
      await saveTripItems(tripId, updatedItems);

      // Update the state with the new items
      setTripItems(updatedItems);
    } catch (error) {
      console.error("Error deleting trip item:", error);
    }
  };

  return (
    <>
      <View style={{ justifyContent: "flex-start", margin: 20, marginTop: 40, backgroundColor: "#163532" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("calendar")}
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
          <MaterialIcons name="packing-bag" size={70} color="#163532" />
          <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
            <Text style={styles.title}>Packing List</Text>
            <Text style={styles.text}>
              On this page you can manage your packing list items!
            </Text>
          </View>
        </View>

        <PackListScreen
          itemsData={tripItems}
          onSaveItem={onSaveTripItem}
          onEditItem={handleEditTripItem}
          onDeleteItem={(item) => handleDeleteTripItem(item)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#D3DFB7",
  },
  text: {
    fontSize: 16,
    color: "##D3DFB7",
  },
});

export default PackListPage;

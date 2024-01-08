import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function StartScreen() {
  const navigation = useNavigation();

  const navigateToNewTrip = () => {
    navigation.navigate("newTrip");
  };

  const navigateToNotes = () => {
    navigation.navigate("notes");
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#163532",
      }}
    >
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <Text
          style={{
            fontSize: 40,
            color: "#D1FFA0",
            margin: 20,
          }}
        >
          Travel Planner
        </Text>
        <Text
          style={{
            margin: 20,
            color: "#EDF2E1",
          }}
        >
          En liten slogan
        </Text>

        {/* TouchableOpacity for navigation */}
        <TouchableOpacity onPress={navigateToNewTrip}>
          <View
            style={{
              backgroundColor: "#D1FFA0",
              padding: 10,
              borderRadius: 14,
              justifyContent: "flex-start",
              width: 130,
              margin: 20,
            }}
          >
            <Text style={{ color: "#163532" }}>Create New Trip</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToNotes}>
          <View>
            <Text style={{ color: "white" }}>Add note</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StartScreen;

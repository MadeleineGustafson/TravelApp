import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import backgroundImage from "../assets/backgroundTrain.jpg";

function StartScreen() {
  const navigation = useNavigation();

  const navigateToNewTrip = () => {
    navigation.navigate("newTrip");
  };

  return (
    <ImageBackground
    source={backgroundImage}
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
          Make your travel planning easier
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
      </View>
      </ImageBackground>
  );
}

export default StartScreen;

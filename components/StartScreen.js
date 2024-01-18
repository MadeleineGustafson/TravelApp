import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import backgroundImage from "../assets/Train_Darker.png";

function StartScreen() {
  const navigation = useNavigation();

  const navigateToMyTrips = () => {
    navigation.navigate("myTrips");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // opacity: 1.6,
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
        <TouchableOpacity onPress={navigateToMyTrips}>
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
            <Text style={{ color: "#163532" }}>Start planning!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default StartScreen;

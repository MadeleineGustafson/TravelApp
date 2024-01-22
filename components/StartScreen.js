import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import backgroundImage from "../assets/Train_Darker.png";

function StartScreen() {
  const navigation = useNavigation();
  
  const navigateToMyTrips = () => {
    navigation.navigate("myTrips");
  };
  
  const [fontsLoaded] = useFonts({
    'Kalnia-Bold': require("../assets/fonts/Kalnia-Bold.ttf"),
    'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf")
  })

  if(!fontsLoaded){
    return undefined;
  }

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
            fontSize: 55,
            fontFamily:"Kalnia-Bold",
            color: "#D1FFA0",
            margin: 20,
          }}
        >
          Travel Planner
        </Text>
        <Text
          style={{
            margin: 20,
            fontFamily:"Poppins-Regular",
            fontSize: 18,
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
              width: 140,
              margin: 20,
            }}
          >
            <Text style={{ color: "#163532", fontSize: 15, fontFamily:"Poppins-Bold",}}>
              Start planning!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default StartScreen;

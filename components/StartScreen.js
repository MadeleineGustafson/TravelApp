import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import backgroundImage from "../assets/Train_Darker.png";
import bigLine from "../assets/bigLine.png";

function StartScreen() {
  const navigation = useNavigation();

  const navigateToMyTrips = () => {
    navigation.navigate("myTrips");
  };

  const [fontsLoaded] = useFonts({
    'Kalnia-Bold': require("../assets/fonts/Kalnia-Bold.ttf"),
    'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Regular': require("../assets/fonts/Poppins-Regular.ttf")
  });

  if (!fontsLoaded) {
    return undefined;
  }

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
      <View style={{ position: 'relative', justifyContent: "flex-start", width: "100%" }}>
        <Image
          source={bigLine}
          style={{
            zIndex: 1,  // Set a higher zIndex for bigLine
            position: 'absolute',  // Position it absolutely within the parent
            top: 230,
            left: 0,
            right: 50,
            bottom: 0,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", zIndex: 2 }}>
        <Text
            style={{
              fontSize: 55,
              fontFamily: "Kalnia-Bold",
              color: "#D1FFA0",
              margin: 20,  
              top: -70,
            }}
          >
            Travel Planner
          </Text>
          <MaterialIcons name="train" size={55} color="#D1FFA0" style={{top: -32}} />
        </View>

        <Text
          style={{
            margin: 20,
            fontFamily: "Poppins-Regular",
            fontSize: 18,
            color: "#EDF2E1",
            top: -100,
          }}
        >
          Make your travel planning easier
        </Text>

        {/* TouchableOpacity for navigation */}
        <TouchableOpacity onPress={navigateToMyTrips} style={{ zIndex: 2 }}>
          <View
            style={{
              backgroundColor: "#D1FFA0",
              padding: 10,
              borderRadius: 14,
              justifyContent: "flex-start",
              width: 140,
              margin: 20,
              top: -60,
            }}
          >
            <Text style={{ color: "#163532", fontSize: 15, fontFamily: "Poppins-Bold" }}>
              Start planning!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default StartScreen;

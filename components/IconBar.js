import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

function IconBar({ tripId }) {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName, { tripId });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigateToScreen("restaurants", { tripId })}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons
          name="food"
          size={50}
          color="#D1FFA0"
          style={{
            shadowColor: "#588278", // For iOS
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("sights", { tripId })}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons
          name="ferris-wheel"
          size={50}
          color="#D1FFA0"
          style={{
            shadowColor: "#588278", // For iOS
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Navigating to packlist with tripId:", tripId);
          navigateToScreen("packlist", { tripId });
        }}
        style={styles.iconContainer}
      >
        <Entypo
          name="list"
          size={58}
          color="#D1FFA0"
          style={{
            shadowColor: "#588278", // For iOS
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
        {/* <MaterialIcons name="notes" size={50} color="#D1FFA0" /> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateToScreen("weather")}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons
          name="sun-thermometer"
          size={50}
          color="#D1FFA0"
          style={{
            shadowColor: "#588278", // For iOS
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  iconContainer: {
    marginHorizontal: 20, // Adjust this value to add space between icons
  },
};

export default IconBar;

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

function IconBar() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
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
        onPress={() => navigateToScreen("restaurants")}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons name="food" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("sights")}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons name="ferris-wheel" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("notes")}
        style={styles.iconContainer}
      >
        <MaterialIcons name="notes" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("weather")}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons
          name="sun-thermometer"
          size={50}
          color="#D1FFA0"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  iconContainer: {
    marginHorizontal: 10, // Adjust this value to add space between icons
  },
};

export default IconBar;

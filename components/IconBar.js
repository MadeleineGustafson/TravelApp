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
        padding: 30,
      }}
    >
      <TouchableOpacity onPress={() => navigateToScreen("restaurants")}>
        <MaterialCommunityIcons name="food" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("sights")}>
        <MaterialCommunityIcons name="ferris-wheel" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("notes")}>
        <MaterialIcons name="notes" size={50} color="#D1FFA0" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("weather")}>
        <MaterialCommunityIcons
          name="sun-thermometer"
          size={50}
          color="#D1FFA0"
        />
      </TouchableOpacity>
    </View>
  );
}

export default IconBar;

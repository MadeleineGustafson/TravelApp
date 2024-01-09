import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";

function IconBar() {
  const navigation = useNavigation();

  const navigateToRestaurant = () => {
    navigation.navigate("restaurants");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 60,
        padding: 30,
      }}
    >
      <TouchableOpacity onPress={navigateToRestaurant}>
        <MaterialCommunityIcons name="food" size={50} color="green" />
      </TouchableOpacity>
      <MaterialCommunityIcons name="ferris-wheel" size={50} color="green" />
      <MaterialIcons name="notes" size={50} color="green" />
      <MaterialCommunityIcons name="sun-thermometer" size={50} color="green" />
    </View>
  );
}

export default IconBar;

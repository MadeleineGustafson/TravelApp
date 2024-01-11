import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

function MyTripsScreen() {
  const navigation = useNavigation();
  const navigateToNewTrip = () => {
    const serializedTripData = {};

    navigation.navigate("newTrip", {});
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> My trips:</Text>

      <TouchableOpacity onPress={navigateToNewTrip}>
        <View>
          <Text>Create New Trip</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MyTripsScreen;

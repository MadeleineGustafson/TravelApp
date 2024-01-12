import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function MyTripsScreen() {
  const navigation = useNavigation();
  const navigateToNewTrip = () => {
    const serializedTripData = {};

    navigation.navigate("newTrip", {});
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#163532",
      }}
    >
      <Text> My trips:</Text>
      <Text> All trips goes in a list</Text>

      <TouchableOpacity onPress={navigateToNewTrip}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create New Trip</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D1FFA0",
    padding: 10,
    borderRadius: 14,
    justifyContent: "flex-start",
    width: 200,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#163532",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyTripsScreen;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function Sights() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
      <View style={{ justifyContent: "flex-start", width: "90%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("calendar")} // Navigate to CalendarScreen
        >
          <MaterialCommunityIcons name="close" size={30} color="#163532" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons name="ferris-wheel" size={50} color="#163532" />
        <Text style={styles.title}>Sights</Text>
      </View>

      <Text style={styles.text}>
        On this page you can save information about sights attractions for your
        trip!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#163532",
  },
  text: {
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    color: "#333",
  },
});

export default Sights;

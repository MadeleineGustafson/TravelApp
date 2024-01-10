import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

function Notes() {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="notes" size={50} color="#163532" />
        <Text style={styles.title}>Notes</Text>
      </View>

      <Text style={styles.text}>
        On this page you can save general notes for your trip!
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

export default Notes;

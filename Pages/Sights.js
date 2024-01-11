import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function Sights() {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ justifyContent: "flex-start", margin: 20, marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("calendar")} // Navigate to CalendarScreen
        >
          <MaterialCommunityIcons name="close" size={30} color="#163532" />
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", marginTop: 10, margin: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
            //flex: 1,
          }}
        >
          <MaterialCommunityIcons
            name="ferris-wheel"
            size={70}
            color="#163532"
          />
          <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
            <Text style={styles.title}>Sights</Text>
            <Text style={styles.text}>
              On this page you can save information about sights attractions for
              your trip!
            </Text>
          </View>
        </View>

        {/*
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
    </Text> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",

    color: "#163532",
  },
  text: {
    fontSize: 16,
    padding: 10,

    color: "#333",
  },
});

export default Sights;

import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function NewTripScreen() {
  const navigation = useNavigation();

  const navigateToMainPage = () => {
    navigation.navigate("tripHomePage");
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
      <Text style={styles.titleText}> Plan new trip</Text>
      <SafeAreaView>
        <Text style={styles.baseText}> What is your name?</Text>
        <TextInput
          style={styles.input}
          //onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your Name"
          //keyboardType="numeric"
        />
        <Text style={styles.baseText}> Where are you going?</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your destination"
          keyboardType="numeric"
        />
        <Text style={styles.baseText}> When are you going?</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your travel dates"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={navigateToMainPage}>
          <View
            style={{
              backgroundColor: "#D1FFA0",
              padding: 10,
              borderRadius: 14,
              justifyContent: "flex-start",
              width: 130,
              margin: 20,
            }}
          >
            <Text style={{ color: "#163532" }}>Create New Trip</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
  baseText: {
    fontSize: 20,
    color: "white",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});

export default NewTripScreen;

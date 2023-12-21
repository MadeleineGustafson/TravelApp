import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

function NewTripScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView>
        <Text> What is your name?</Text>
        <TextInput
          style={styles.input}
          //onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your Name"
          //keyboardType="numeric"
        />
        <Text> Where are you going?</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your destination"
          keyboardType="numeric"
        />
        <Text> When are you going?</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          //value={number}
          placeholder="Enter your travel dates"
          keyboardType="numeric"
        />
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
  },
});

export default NewTripScreen;

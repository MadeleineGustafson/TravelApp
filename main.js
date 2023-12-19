import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import NewTripScreen from "./components/NewTripScreen";
import StartScreen from "./components/StartScreen";

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="newTrip" component={NewTripScreen} />
        {/* <Stack.Screen name="myTrips" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="TripHomePage" />
        <Stack.Screen name="notes" />
        <Stack.Screen name="savedPages" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

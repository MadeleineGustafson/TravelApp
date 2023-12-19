import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="myTrips" component={MyTripsScreen} />
        <Stack.Screen name="newTrip" component={NewTripScreen} />
        <Stack.Screen name="calendar" component={CalendarScreen} />
        <Stack.Screen name="TripHomePage" component={TripHomePageScreen} />
        <Stack.Screen name="notes" component={NotesScreen} />
        <Stack.Screen name="savedPages" component={SavedPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

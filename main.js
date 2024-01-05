import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import CalendarScreen from "./components/CalendarScreen";
import MyTripsScreen from "./components/MyTripsScreen";
import NewTripScreen from "./components/NewTripScreen";
import NotesScreen from "./components/NotesScreen";
import SavedPageScreen from "./components/SavedPageScreen";
import StartScreen from "./components/StartScreen";
import ToDoList from "./components/ToDoList";
import TripHomePageScreen from "./components/TripHomePageScreen";

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="calendar"
        screenOptions={{
          headerShown: false, // This will hide the header for all screens
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="newTrip" component={NewTripScreen} />
        <Stack.Screen name="calendar" component={CalendarScreen} />
        <Stack.Screen name="myTrips" component={MyTripsScreen} />
        <Stack.Screen name="tripHomePage" component={TripHomePageScreen} />
        <Stack.Screen name="notes" component={NotesScreen} />
        <Stack.Screen name="savedPages" component={SavedPageScreen} />
        <Stack.Screen name="TodoPage" component={ToDoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

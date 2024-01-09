import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { FaCalendarAlt, FaHome, FaStickyNote } from 'react-icons/fa';
import CalendarScreen from "./components/CalendarScreen";
import MyTripsScreen from "./components/MyTripsScreen";
import NewTripScreen from "./components/NewTripScreen";
import NotesScreen from "./components/NotesScreen";
import SavedPageScreen from "./components/SavedPageScreen";
import StartScreen from "./components/StartScreen";
import ToDoList from "./components/ToDoList";
import TripHomePageScreen from "./components/TripHomePageScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator
        initialRouteName="Start"
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
  );
}

function TabNavigator() {
  const getTabBarIcon = (route, focused) => {
    const { name } = route;

    switch (name) {
      case 'Home':
        return <FaHome size={20} color={focused ? '#163532' : 'gray'} />;
      case 'Notes':
        return <FaStickyNote size={20} color={focused ? '#163532' : 'gray'} />;
      case 'Calendar':
        return <FaCalendarAlt size={20} color={focused ? '#163532' : 'gray'} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
    })}
    tabBarOptions={{
      activeTintColor: '#163532',
      inactiveTintColor: '#163532', 
    }}
  >
      <Tab.Screen name="Home" component={StartScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

export default function main() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}


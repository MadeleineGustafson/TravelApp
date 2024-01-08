import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import CalendarScreen from './CalendarScreen';
import StartScreen from './StartScreen';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StartScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

export default function Menu() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

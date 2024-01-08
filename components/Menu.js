import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CalendarScreen from './CalendarScreen';
import StartScreen from './StartScreen';
import ToDoList from './ToDoList';

const Tab = createNativeStackNavigator();

function Menu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={StartScreen} />
      <Tab.Screen name="calendar" component={CalendarScreen} />
      <Tab.Screen name="TodoPage" component={ToDoList} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}

export default Menu;
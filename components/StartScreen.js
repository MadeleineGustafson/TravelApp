import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function StartScreen() {
  const navigation = useNavigation();

  const navigateToNewTrip = () => {
    navigation.navigate('newTrip');
  };

  const navigateToCalendar = () => {
    navigation.navigate('calendar');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Start Page</Text>
      {/* TouchableOpacity for navigation */}
      <TouchableOpacity onPress={navigateToNewTrip}>
        <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Create New Trip</Text>
        </View>
      </TouchableOpacity>

        {/* TouchableOpacity for navigating to 'calendar' screen */}
        <TouchableOpacity onPress={navigateToCalendar}>
        <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Go to Calendar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default StartScreen;

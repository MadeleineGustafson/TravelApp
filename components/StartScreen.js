import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function StartScreen() {
  const navigation = useNavigation();

  const navigateToNewTrip = () => {
    // Use the navigate function to go to the 'newTrip' screen
    navigation.navigate('newTrip');
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
    </View>
  );
}

export default StartScreen;

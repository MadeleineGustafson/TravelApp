import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const TodoPage = ({ navigation, route }) => {
  const { selectedDate, addTodo } = route.params || {};
  const [todoText, setTodoText] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTodo = () => {
    addTodo(selectedDateTime, todoText);
    navigation.goBack(); // Navigate back after adding todo
  };

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDateTime(date);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo..."
        onChangeText={(text) => setTodoText(text)}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

       <Button title="Pick Date & Time" onPress={showDatePickerModal} />

      {showDatePicker && (
        <DateTimePicker
        value={selectedDateTime}
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={handleDateChange}
        />
        )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
});

export default TodoPage;

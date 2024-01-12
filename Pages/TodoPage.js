import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const TodoPage = ({ navigation, route }) => {
  const { selectedDate, addTodo } = route.params || {};
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    addTodo(selectedDate, todoText);
    navigation.goBack(); // Navigate back after adding todo
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo..."
        onChangeText={(text) => setTodoText(text)}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
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

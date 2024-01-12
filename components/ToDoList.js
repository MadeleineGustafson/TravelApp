import React, { useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Todo from './Todo';

const ToDoList = ({ selectedDate }) => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const handleAddTodo = () => {
    Keyboard.dismiss();
    const newTodo = { text: todo, date: selectedDate };
    setTodoItems([...todoItems, newTodo]);
    setTodo("");
  };


  const filteredTodos = todoItems.filter(item => item.date === selectedDate);

  const editTodo = (index, newText) => {
    let itemsCopy = [...todoItems];
    itemsCopy[index] = { ...itemsCopy[index], text: newText };
    setTodoItems(itemsCopy);
  };

  const deleteTodo = (index) => {
    let itemsCopy = [...todoItems];
    itemsCopy.splice(index, 1);
    setTodoItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos for {selectedDate}</Text>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => editTodo(index, item.text)}>
            <Todo
              text={item.text}
              onDelete={() => deleteTodo(index)}
              onEdit={(newText) => editTodo(index, newText)}
            />
          </TouchableOpacity>
        )}
      />
      <TextInput 
        style={styles.input} 
        placeholder={'Add a todo'} 
        value={todo} 
        onChangeText={text => setTodo(text)} 
      />
      <TouchableOpacity onPress={() => handleAddTodo()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 200,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  todoItem: {
    width: 20,
  },
  addText: {},
});

export default ToDoList;
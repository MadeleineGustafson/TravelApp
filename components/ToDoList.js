import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Todo from './Todo';

function ToDoList() {
  const [todo, setTodo] = useState();
  const [todoItems, setTodoItems] = useState([]);

  const handleAddTodo = () => {
    Keyboard.dismiss();
    setTodoItems([...todoItems, todo])
    setTodo("");
  }

  const editTodo = (index, newText) => {
    let itemsCopy = [...todoItems];
    itemsCopy[index] = newText;
    setTodoItems(itemsCopy);
  };

  const deleteTodo = (index) => {
    let itemsCopy = [...todoItems];
    itemsCopy.splice(index, 1);
    setTodoItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Add todo */}
      <View style={styles.todosWrapper}>
        <Text style={styles.sectionTitle}>Add todo</Text>
        <View style={styles.items}>
          {/* This is where the todo will go! */}
          {
            todoItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => deleteTodo(index)}>
                  <Todo
                    text={item}
                    onDelete={() => deleteTodo(index)}
                    onEdit={(newText) => editTodo(index, newText)}
                />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a todo */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior="padding"
        style={styles.writeTodoWrapper}
      >

        <TextInput style={styles.input} placeholder={'Add a todo'} value={todo} onChangeText={text => setTodo(text)} />
        <TouchableOpacity onPress={() => handleAddTodo()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  todosWrapper: {
    paddingTop: 10,
    paddingHorizontal: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTodoWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

export default ToDoList
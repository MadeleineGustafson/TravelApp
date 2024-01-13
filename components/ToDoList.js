import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Todo from './Todo';

const ToDoList = ({ selectedDate }) => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  // Set the default time to the current time when the component initializes
  useEffect(() => {
    setSelectedDateTime(new Date());
  }, []);

  const handleAddTodo = () => {
    Keyboard.dismiss();
    const newTodo = { text: todo, date: selectedDateTime };

    // Use the selectedDate to create or update the todos associated with that date
    setTodoItems(prevTodos => ({
      ...prevTodos,
      [selectedDate]: [...(prevTodos[selectedDate] || []), newTodo],
    }));

    setTodo("");
    setShowDatePicker(false);
    // Set the selectedDateTime to the current time when adding a new todo
    setSelectedDateTime(new Date());
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDateTime(selectedDate);
    }
  };

  const editTodo = (index, newText) => {
    setTodoItems(prevTodos => {
      const updatedTodos = [...(prevTodos[selectedDate] || [])];
      updatedTodos[index] = { ...updatedTodos[index], text: newText };
      return { ...prevTodos, [selectedDate]: updatedTodos };
    }); 
  };

  const handleEditSave = (editedText) => {
    if (editIndex !== null) {
      setTodoItems(prevTodos => {
        const updatedTodos = [...(prevTodos[selectedDate] || [])];
        updatedTodos[editIndex] = {...updatedTodos[editIndex], text: editedText };
        return {...prevTodos, [selectedDate]: updatedTodos};
      });
      setEditIndex(null);
    }
  }

  const deleteTodo = (index) => {
    setTodoItems(prevTodos => {
      const updatedTodos = [...(prevTodos[selectedDate] || [])];
      updatedTodos.splice(index, 1);
      return { ...prevTodos, [selectedDate]: updatedTodos };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos for {selectedDate}</Text>

      <FlatList
        data={todoItems[selectedDate] || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Todo
            text={item.text}
            time={item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            onDelete={() => deleteTodo(index)}
            onEdit={(newText) => editTodo(index, newText)}
            onSave={handleEditSave}
          />
        )}
      />
        
      <View style={styles.dateTimePickerContainer}>
        <TextInput 
          style={styles.input} 
          placeholder={'Add a todo'} 
          value={todo} 
          onChangeText={text => setTodo(text)} 
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text><FontAwesome5 name="clock" size={24} color="black" /></Text>
        </TouchableOpacity>
      </View>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDateTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}     
      
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
    width: 250,
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
    flexDirection: 'column', // Change to 'column'
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the start
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
    marginBottom: 5, // Add margin bottom for spacing
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addText: {},
});

export default ToDoList;
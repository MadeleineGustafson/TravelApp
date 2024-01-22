import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Todo from './Todo';


const ToDoList = ({ selectedDate }) => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);
  const [selectedStartDateTime, setSelectedStartDateTime] = useState(new Date());
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(new Date());

  const handleAddTodo = () => {
    Keyboard.dismiss();
    const newTodo = { text: todo, startTime: selectedStartDateTime, endTime: selectedEndDateTime };

    setTodoItems(prevTodos => ({
      ...prevTodos,
      [selectedDate]: [...(prevTodos[selectedDate] || []), newTodo],
    }));

    setTodo("");
    setShowStartDateTimePicker(false);
    setShowEndDateTimePicker(false);
    setSelectedStartDateTime(new Date());
    setSelectedEndDateTime(new Date());
  };

  const handleStartDateTimeChange = (event, selectedDate) => {
    setShowStartDateTimePicker(false);
    if (selectedDate) {
      setSelectedStartDateTime(selectedDate);
    }
  };

  const handleEndDateTimeChange = (event, selectedDate) => {
    setShowEndDateTimePicker(false);
    if (selectedDate) {
      setSelectedEndDateTime(selectedDate);
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
      setTodoItems((prevTodos) => {
        const updatedTodos = [...(prevTodos[selectedDate] || [])];
        updatedTodos[editIndex] = { ...updatedTodos[editIndex], text: editedText };
        return { ...prevTodos, [selectedDate]: updatedTodos };
      });
      setEditIndex(null);
    }
  };

  const deleteTodo = (index) => {
    setTodoItems(prevTodos => {
      const updatedTodos = [...(prevTodos[selectedDate] || [])];
      updatedTodos.splice(index, 1);
      return { ...prevTodos, [selectedDate]: updatedTodos };
    });
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
  
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's plans</Text>
      <Text style={styles.sectionTitleNotBold}>
        {new Date(selectedDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        }) + getDaySuffix(new Date(selectedDate).getDate())}
      </Text>

      <FlatList
        data={todoItems[selectedDate] || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Todo
            text={item.text}
            startTime={item.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            endTime={item.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          placeholderTextColor={'#163532'}
          value={todo} 
          onChangeText={text => setTodo(text)} 
        />

      <TouchableOpacity onPress={() => handleAddTodo()}>
        <View style={styles.addWrapper}>
           <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
        
      </View>

      <View style={styles.dateTimePickers}>
        <TouchableOpacity onPress={() => setShowStartDateTimePicker(true)}>
          <Text style={styles.timeText}>Start: {selectedStartDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>


        {showStartDateTimePicker && (
          <DateTimePicker
          value={selectedStartDateTime}
          mode="time"
          is24Hour={true}
          display="default"
            onChange={handleStartDateTimeChange}
            textColor="white"

          />
        )}
     

        <TouchableOpacity onPress={() => setShowEndDateTimePicker(true)}>
          <Text style={styles.timeText}>End: {selectedEndDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>

        {showEndDateTimePicker && (
          <DateTimePicker
            value={selectedEndDateTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndDateTimeChange}
            textColor="white"
            />
            )}

        </View>
      </View>
  </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#163532',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily:"Poppins-Bold",
    textAlign: 'left',
    color: "white"
  },
  sectionTitleNotBold: {
    fontSize: 17,
    fontWeight: 'normal',
    fontFamily:"Poppins-Regular",
    marginBottom: 10,
    textAlign: 'left',
    color: "white"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#D3DFB7',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    fontFamily:"Poppins-Regular",
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#D3DFB7',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  todoItem: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
    marginBottom: 5, 
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

  dateTimePickers: {
    flexDirection: 'row',
    alignItems: 'center',
    color: "#fff"
  },
  addText: {
    fontSize: 20,
  },
  timeText: {
    fontSize: 20,
    fontFamily:"Poppins-Regular",
    color: "#D3DFB7",
  },
});

export default ToDoList;
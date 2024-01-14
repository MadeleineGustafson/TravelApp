import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = () => {
    props.onEdit(editedText);
    handleEditToggle();
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={(text) => setEditedText(text)}
          />
        ) : (
          <View>
            <Text style={styles.itemText}>{props.text}</Text>
            {props.time && <Text style={styles.timeText}>{props.time}</Text>}
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleEditSave}>
            <Text style={styles.saveText}>
              <Entypo name="check" size={20} color="black" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>
              <Feather name="edit" size={18} color="black" />
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={props.onDelete}>
          <Text style={styles.deleteText}>
            <FontAwesome5 name="trash" size={18} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E8EAED',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 360,
    
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemText: {
    maxWidth: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    maxWidth: '100%',
    fontSize: 16,
    fontWeight: 'none',
  },
  editInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  propsTime: {
    fontSize: 28,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 20,
  },
  saveText: {
    color: 'green',
    marginLeft: -40,
  },
  deleteText: {
    color: 'red',
  },
  dateText: {
    color: 'gray',
    fontSize: 12,
  },
});

export default Todo;
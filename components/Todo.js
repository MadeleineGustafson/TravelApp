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
    // Implement the logic to save the edited todo
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
          <Text style={styles.itemText}>{props.text}</Text>
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
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '100%',
  },
  editInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 52,
  },
  saveText: {
    color: 'green',
    marginLeft: -80,
  },
  deleteText: {
    color: 'red',
    marginLeft: -40,
  },
});

export default Todo;
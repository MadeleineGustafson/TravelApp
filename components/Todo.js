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
              <View style={styles.timeContainer}>
              {props.startTime && (
                <Text style={styles.timeText}>{`${props.startTime}`}</Text>
                )}
              {props.endTime && (
                <Text style={styles.timeText}>{`-${props.endTime}`}</Text>
                )}
              </View>
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleEditSave}>
            <Text style={styles.saveText}>
              <Entypo name="check" size={20} color="#163532" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>
              <Feather name="edit" size={18} color="#163532" />
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={props.onDelete}>
          <Text style={styles.deleteText}>
            <FontAwesome5 name="trash" size={18} color="#163532" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#D3DFB7',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 300,
    
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'

  },
  itemText: {
    maxWidth: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    color: "#163532",
  },
  timeText: {
    maxWidth: '100%',
    fontSize: 16,
    color: "#163532",
  },
  timeContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  editInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: '#D3DFB7',

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
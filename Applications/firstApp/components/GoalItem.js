import {StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem (props) {
  return (
    <View style={styles.goalItem}>
      <Pressable 
        android_ripple={{color: '#210644'}} 
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({pressed}) => pressed && styles.pressedItems}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5E0ACC',
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 8,
    color: 'white',
  }
});
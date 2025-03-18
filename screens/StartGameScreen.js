import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert} from 'react-native';
import Colors from '../constants/colors';

import PrimaryButton from '../components/ui/PrimaryButton';

function  StartGameScreen({onPickedNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99.', 
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      );
      return;
    }

    onPickedNumber(chosenNumber);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.numberInput} 
        maxLength={2} 
        keyboardType='number-pad'
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonStyles}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonStyles}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer:{
    justifyContent: 'center', //main axis
    alignItems: 'center', //cross axis
    padding:16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4, //just for android
    shadowColor: 'black', //just for ios
    shadowOffset: {width: 0, height: 2}, //just for ios
    shadowRadius: 6, //just for ios
    shadowOpacity: 0.25, //just for ios
    backgroundColor: Colors.primary800,
  },
  numberInput:{
    height: 60,
    width: 50,
    fontSize: 32,
    marginVertical: 8,
    color: Colors.accent500,
    fontWeight: 'bold',
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  buttonsContainer:{
    flexDirection: 'row',
  },
  buttonStyles:{
    flex: 1,
  },
});

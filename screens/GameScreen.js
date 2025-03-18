import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

function generatedRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max -min)) + min;

  if(rndNum === exclude) {
    return generatedRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber}) {
  const initialGuess = generatedRandomBetween(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {
    if(direction === 'lower') {
      maxBoundary = currentGuess;
      const newRndNumber = generatedRandomBetween(minBoundary, maxBoundary, currentGuess);
    } else {
      minBoundary = currentGuess;
      const newRndNumber = generatedRandomBetween(minBoundary, maxBoundary, currentGuess);
    }
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler}>+</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler}>-</PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View> 
  );
}

export default GameScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttons:{
    flexDirection: 'row',
  },
});
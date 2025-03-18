import {View, Text, Pressable, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

function  PrimaryButton({children, onPress}) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable 
        onPress={onPress}
        style={({pressed}) => 
          pressed 
            ? [styles.buttonInnerContainer, styles.pressedStyle] //for ios when button is pressed we combine to styles
            : styles.buttonInnerContainer
        }
        android_ripple={{color: Colors.primary600}} //for android when button is pressed
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer:{
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer:{
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, //just for android
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
  },
  pressedStyle:{ //just for ios
    opacity: 0.75,
  },
});

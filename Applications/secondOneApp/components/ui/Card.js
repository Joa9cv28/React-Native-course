import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

function Card({children}) {
  return (
    <View style={styles.card}>{children}</View>
  );
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card:{
    justifyContent: 'center', //main axis
    alignItems: 'center', //cross axis
    padding:16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4, //just for android
    shadowColor: 'black', //just for ios
    shadowOffset: {width: 0, height: 2}, //just for ios
    shadowRadius: 6, //just for ios
    shadowOpacity: 0.25, //just for ios
    backgroundColor: Colors.primary800,
  },
});
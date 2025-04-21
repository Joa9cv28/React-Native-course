import { useContext, useLayoutEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

import { MEALS } from '../data/dummy-data';
import MealsDetails from '../components/MealsDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';

function MealsDetailsScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    if(mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton 
            icon={mealIsFavorite ? 'star' : 'star-outline'} 
            color="white" 
            onPress={changeFavoriteStatusHandler}
          />
        );
      }
    });
  }, [navigation, changeFavoriteStatusHandler]);
  
  return(
    <ScrollView style={styles.rootContainer}>
      <Image  style={styles.image} source={{ uri: selectedMeal.imageUrl }}/>
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealsDetails 
        duration={selectedMeal.duration} 
        complexity={selectedMeal.complexity} 
        affordability={selectedMeal.affordability} 
        textStyle={styles.detailsText}
      />
      <View style={styles.listOutercontainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealsDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 8,
    textAlign: 'center',
  },
  detailsText: {
    color: 'white',
  },
  listOutercontainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});

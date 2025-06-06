import { Button, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealsDetailsScreen from './screens/MealsDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
// import FavoritesContextProvider from './store/context/favorites-context';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneStyle: { backgroundColor: '#3f2f25' },  
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',      
        drawerActiveTintColor: '#351401',  
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
      <Drawer.Screen 
        name='Categories'
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='list' color={color} size={size} />;
          },
        }}
      />
      <Drawer.Screen 
        name='Favorites'
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='star' color={color} size={size} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return(
    <>
      <StatusBar style='light'/>
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25' },          
            }}
          >
            <Stack.Screen 
              name='DrawerScreen' 
              component={DrawerNavigator} 
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name='MealsOverview' 
              component={MealsOverviewScreen} 
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen 
              name='MealsDetails' 
              component={MealsDetailsScreen} 
              options={{
                title: 'About the Meal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

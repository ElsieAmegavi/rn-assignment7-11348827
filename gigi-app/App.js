import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/pages/HomePage';
import { CheckoutPageScreen } from './src/pages/CheckoutPage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppRegistry } from 'react-native';
import StoreScreen from './src/pages/Store';
import LocationScreen from './src/pages/Location';
import BlogScreen from './src/pages/Blog';
import JewelryScreen from './src/pages/Jewelry';
import ElectronicsScreen from './src/pages/Electronics';
import { name as appName } from './app.json';


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();


const StackNavigator = () => (
  <Stack.Navigator>
        <Stack.Screen name="Homepage" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Checkout" component={CheckoutPageScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Store">
    <Drawer.Screen name="Store" component={StoreScreen} />
    <Drawer.Screen name="Location" component={LocationScreen} />
    <Drawer.Screen name="Blog" component={BlogScreen} />
    <Drawer.Screen name="Jewelry" component={JewelryScreen} />
    <Drawer.Screen name="Electronics" component={ElectronicsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
      <DrawerNavigator/>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;

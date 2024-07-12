import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AppRegistry, Image, View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './src/pages/HomePage';
import CheckoutPageScreen from './src/pages/CheckoutPage';
import StoreScreen from './src/pages/Store';
import LocationScreen from './src/pages/Location';
import BlogScreen from './src/pages/Blog';
import JewelryScreen from './src/pages/Jewelry';
import ElectronicsScreen from './src/pages/Electronics';
import { name as appName } from './app.json';
import ProductDetailScreen from './src/pages/ProductDetail';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 27 }}>ERIC ATSU</Text>
      <View style={{
        borderColor: "#ff5757",
        borderWidth: 1,
        marginTop: 10,
        width: 100,
      }} />
    </View>
    {/* Include the default drawer items below */}
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="HomeStack">
    <Stack.Screen name="Homepage" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Checkout" component={CheckoutPageScreen} options={{ headerShown: false }} />
    <Stack.Screen name='ProductDetails' component={ProductDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const CustomHeaderRight = ({ navigation }) => {
  // Custom header code as before
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => console.log('First image pressed')}>
        <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={require('./assets/Search.png')} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('./assets/shoppingBag.png')} 
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen 
      name="Home" 
      component={HomeStackNavigator}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Image
            style={{ width: 120, height: 30 }}
            source={require('./assets/Logo.png')} 
            resizeMode="contain"
          />
        ),
        headerRight: () => <CustomHeaderRight navigation={navigation} />,
        headerShown: true,
      })}
    />
    <Drawer.Screen name="Store" component={StoreScreen} />
    <Drawer.Screen name="Locations" component={LocationScreen} />
    <Drawer.Screen name="Blog" component={BlogScreen} />
    <Drawer.Screen name="Jewelry" component={JewelryScreen} />
    <Drawer.Screen name="Electronic" component={ElectronicsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;

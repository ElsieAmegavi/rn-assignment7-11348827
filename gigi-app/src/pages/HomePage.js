import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
      setProducts(json);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems == null) {
        await AsyncStorage.setItem('cartItems', JSON.stringify([product]));
      } else {
        let arrayItem = JSON.parse(cartItems);
        if (!Array.isArray(arrayItem)) {
          arrayItem = [arrayItem];
        }
        const itemFound = arrayItem.find((item) => item.id === product.id);
        if (itemFound) {
          console.log('Product already exists in cart.');
        } else {
          arrayItem.push(product);
          await AsyncStorage.setItem('cartItems', JSON.stringify(arrayItem));
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const navigateToCart = () => {
    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{ uri: item.image }} />
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Image style={styles.addToCart} source={require('../../assets/add_circle.png')}/>
        </TouchableOpacity>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerImages}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../../assets/Menu.png')} />
        </TouchableOpacity>
        <Image source={require('../../assets/Logo.png')} />
        <View style={styles.innerImages}>
          <Image source={require('../../assets/Search.png')} />
          <TouchableOpacity onPress={navigateToCart}>
            <Image style={styles.shoppingBagImage} source={require('../../assets/shoppingBag.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondHeader}>
        <Text style={styles.secondHeaderText}>OUR STORY</Text>
        <View style={styles.secondInnerImage}>
          <View style={styles.background}>
            <Image source={require('../../assets/Listview.png')} />
          </View>
          <View style={styles.background}>
            <Image style={styles.filterImage} source={require('../../assets/Filter.png')} />
          </View>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.catalogue}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  headerImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  innerImages: {
    flexDirection: 'row',
  },
  shoppingBagImage: {
    marginLeft: 15,
  },
  secondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 17,
  },
  secondInnerImage: {
    flexDirection: 'row',
  },
  background: {
    height: 40,
    width: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  secondHeaderText: {
    letterSpacing: 6,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  catalogue: {
    paddingHorizontal: 5,
  },
  productContainer: {
    width:170,
    margin:10,
    paddingHorizontal:5
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    alignItems: 'center'
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  addToCartButton: {
   left:100,
  },
});

export default HomeScreen;

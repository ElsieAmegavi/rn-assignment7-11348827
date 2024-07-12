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
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <View style={styles.pictureContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Image style={styles.addToCart} source={require('../../assets/add_circle.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
      </View>
    </TouchableOpacity>
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
  },
  catalogue: {
    paddingHorizontal: 5,
  },
  productContainer: {
    width: 170,
    height: 200,
    margin: 10,
    paddingHorizontal: 5,
  },
  pictureContainer: {
    width: 170,
    height: 140,
  },
  productImage: {
    width: 170,
    height: 140,
    resizeMode: 'contain',
    borderRadius: 8,
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 12,
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  addToCartButton: {
    position: 'absolute',
    right: 0,
    bottom: 1
  },
});

export default HomeScreen;

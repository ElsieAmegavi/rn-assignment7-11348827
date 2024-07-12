import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckoutPageScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Error loading cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
        setTotalAmount(total);
    };

    const removeFromCart = async (product) => {
        const updatedCartItems = cartItems.filter(item => item.id !== product.id);
        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const renderItem = ({ item }) => (
        <View style={styles.catalogueRow}>
            <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.images} source={{ uri: item.image }} /> 
                </View>
                <View style={styles.imageWriting}>
                    <Text style={styles.imageLabel}>{item.title}</Text>
                    <Text style={styles.imageDescription}>{item.description}</Text>
                    <Text style={styles.imagePrice}>{`$${item.price}`}</Text>

                    <TouchableOpacity onPress={() => removeFromCart(item)}>
                        <Image style={styles.removeFromCart} source={require('../../assets/remove.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerImages}>
                <Image source={require('../../assets/Logo.png')} />
                <View style={styles.innerImages}>
                    <Image source={require('../../assets/Search.png')} />
                </View>
            </View>

            <View style={styles.secondHeader}>
                <Text style={styles.secondHeaderText}>CHECKOUT</Text>
                <View style={styles.secondInnerImage}></View>
            </View>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.catalogue}
            />

            <View style={styles.secondHeader}>
                <Text style={styles.text}>EST. TOTAL</Text>
                <View style={styles.totalAmountView}>
                    <Text style={styles.totalAmountText}>{`$${totalAmount.toFixed(2)}`}</Text>
                </View>
            </View>

            <View style={styles.checkoutButtonView}>
                <Text style={styles.checkoutButton}>CHECKOUT</Text>
                <View style={styles.secondInnerImage}></View>
            </View>
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
        marginLeft: 120
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
        textAlign: 'center',
        marginLeft: 90
    },
    catalogue: {
        paddingHorizontal: 15,
    },
    catalogueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    images: {
        margin: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    imageLabel: {
        textTransform: 'uppercase',
        textAlign: 'left',
        marginTop: 8,
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 2
    },
    imageDescription: {
        textAlign: 'left',
        marginTop: 4,
        fontSize: 14,
        color: '#888',
    },
    imagePrice: {
        textAlign: 'left',
        marginTop: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#f5680a',
    },
    removeFromCart: {
        left: 200,
    },
    imageWriting: {
      textAlign:'center'
    },
    totalAmountView: {
        flexDirection: 'row',
        fontSize: 24,
    },
    totalAmountText: {
        fontSize: 24,
        color: '#D45C07'
    },
    text: {
        letterSpacing: 2,
        fontSize:20
    },
    checkoutButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 25,
        paddingHorizontal: 17,
        backgroundColor: 'black',
    },
    checkoutButton: {
        color: 'white',
        letterSpacing: 6,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        marginLeft: 90
    }
});

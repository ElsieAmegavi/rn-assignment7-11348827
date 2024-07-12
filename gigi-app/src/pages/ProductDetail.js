import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
        <View>
            <View>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.productTitleView}>
                <Text style={styles.name}>{product.title}</Text>
                <Image source={require('../../assets/Export.png')} />
                </View>
                    <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            
            <View >
                <Text style={styles.sectionTitle}>MATERIALS</Text>
                <Text style={styles.materialsText}>
                We work with monitoring programmes to ensure compliance with safety,
                health and quality standards for our products.
                </Text>

                <View style={styles.careInstructions}>
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                    <Image
                    style={{ marginRight: 10 }}
                    source={require("../../assets/Do Not Bleach.png")}
                    />
                    <Text style={styles.careItem}>Do not use bleach</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Image
                    style={{ marginRight: 10 }}
                    source={require("../../assets/Do Not Tumble Dry.png")}
                    />
                    <Text style={styles.careItem}>Do not tumble dry</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Image
                    style={{ marginRight: 10 }}
                    source={require("../../assets/Do Not Wash.png")}
                    />
                    <Text style={styles.careItem}>
                    Dry clean with tetrachloroethylene
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Image
                    style={{ marginRight: 10 }}
                    source={require("../../assets/Iron Low Temperature.png")}
                    />
                    <Text style={styles.careItem}>
                    Iron at a maximum of 110°C/230°F
                    </Text>
                </View>
                </View>
                <View
                style={{ borderColor: "gray", borderWidth: 1, marginBottom: 40 }}
                ></View>

                <View style={styles.shippingInfo}>
                <View
                    style={{
                    flexDirection: "row",
                    }}
                >
                    <Image
                    style={{ marginRight: 10 }}
                    source={require("../../assets/Shipping.png")}
                    />
                    <Text style={styles.shippingTitle}>Free Flat Rate Shipping</Text>
                    <Image source={require('../../assets/Up.png')} style={{marginLeft:100}} />
                </View>

                <Text style={styles.shippingDate}>Estimated to be delivered on</Text>
                <Text style={styles.shippingDate}> 09/11/2021 - 12/11/2021.</Text>
                </View>


                <TouchableOpacity style={styles.addToBasketButton}>
                    <View style={styles.addToBasketView}>
                        <View style={styles.abone}>
                            <Image source={require('../../assets/white-plus.png')} style={styles.plus}/>
                            <Text style={styles.addToBasketText}>ADD TO BASKET</Text>
                        </View>
                        <Image source={require('../../assets/white-heart.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 22,
    color: '#D45C07',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: "#ff5757",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  materialsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  careInstructions: {
    marginBottom: 16,
  },
  careItem: {
    fontSize: 20,
    color: "gray",
    lineHeight: 20,
  },
  shippingInfo: {
    marginBottom: 24,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  shippingDate: {
    fontSize: 14,
    marginLeft:35
  },
  addToBasketButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 4,
  },
  addToBasketText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addToBasketView: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  abone: {
    flexDirection: 'row'
  },
  plus: {
    marginRight:15
  }
});

export default ProductDetailScreen;

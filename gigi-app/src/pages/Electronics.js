import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export const ElectronicsScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ElectronicsScreen;
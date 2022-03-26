import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
  } from 'react-native';
import { Children } from 'react/cjs/react.production.min';
import Rainbow from "./Rainbow";

const customData = require('./btcVsusd.json');

let checkIndexIsEven = (n) => {
    return n % 2 == 0;
}

    // <View style={[styles.item, { backgroundColor: checkIndexIsEven(item.type_is_crypto) ? '#99AEBB' : '#51BBE9'}]}>

const CurrencyScreen = ({ navigation }) => {

    return (
        <View>
            
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: StatusBar.currentHeight || 0,
      },

});

export default HomeScreen;


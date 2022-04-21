import React, { useState, useEffect } from 'react';
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
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';
import { Children } from 'react/cjs/react.production.min';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coinApiKey = "0241F9BA-25FA-4312-A838-A7913E667D2A";
// 8C18FFE2-77F9-43A2-B19D-294E7590D478 - wojtkowy
// 0241F9BA-25FA-4312-A838-A7913E667D2A - jakubwy
// DF7C3A9B-D7C7-40A0-B4C5-2AE781249E7D - wojtkowy drugi
// 358EDCE6-2D79-4BFA-BEDA-AA403745B09D another one
//E7BB5FA1-BAD5-4A32-86E2-E135C7A5006D

const config = {
    headers: {
        "Accept": "application/json",
        "Accept-Encoding": "deflate, gzip",
    }
}

const iconDimensions = 150;

let ExampleCoinData = [
    {
      "asset_id": "BTC",
      "name": "Bitcoin",
      "type_is_crypto": 1,
      "data_quote_start": "2014-02-24T17:43:05.0000000Z",
      "data_quote_end": "2022-03-16T17:55:46.0288613Z",
      "data_orderbook_start": "2014-02-24T17:43:05.0000000Z",
      "data_orderbook_end": "2020-08-05T14:38:38.3413202Z",
      "data_trade_start": "2010-07-17T23:09:17.0000000Z",
      "data_trade_end": "2022-03-16T17:58:45.1770000Z",
      "data_symbols_count": 80688,
      "volume_1hrs_usd": 5528291964270.93,
      "volume_1day_usd": 90066860572663.48,
      "volume_1mth_usd": 2498499690633434.5,
      "price_usd": 39934.232258992706,
      "id_icon": "4caf2b16-a017-4e26-a348-2cea69c34cba",
      "data_start": "2010-07-17",
      "data_end": "2022-03-16"
    }
]

let ExampleCoinIconData = [
    {
        "asset_id": "BTC",
        "url": "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/4caf2b16a0174e26a3482cea69c34cba.png"
    },
]

let ExampleCoinExchangeRatesEuro = [
    {
        "time": "2022-03-16T19:12:44.4000000Z",
        "asset_id_quote": "BTC",
        "rate": 0.000027361876161065196
    },
]

let checkIndexIsEven = (n) => {
    return n % 2 == 0;
}

const showToast = (message, isShort = true, gravity = ToastAndroid.CENTER) => {
    ToastAndroid.showWithGravity(message, (isShort ? ToastAndroid.SHORT : ToastAndroid.LONG), gravity);
  };

let currencyApiRequestNameMapper = {"€":"EUR"}

const FavouritesScreen = ({ navigation, mainCurrency }) => {
    // Hooks ####################################################
    const [coinList, setCoinList] = useState(ExampleCoinData);
    const [coinIconList, setCoinIconList] = useState(ExampleCoinIconData);
    const [currnecyApiRequestName, setCurrnecyApiRequestName] = useState(currencyApiRequestNameMapper[mainCurrency])
    const [favourtiessList, setFavourtiessList] = useState([])

    // Async storage secotion #################################################
    const getAsyncStorageData = async () => {
        return new Promise( async (resolve, reject) => {
            try {
                //Load data
                let favoritesArray = await AsyncStorage.getItem('FAVORITE_CURRENCIES');
                favoritesArray = JSON.parse(favoritesArray);
                console.log("favoritesArray in get: ",typeof(favoritesArray));
                console.log("favoritesArray in get: ",favoritesArray);

                //Check if empty -> if yes make empty table
                if( favoritesArray === undefined || favoritesArray === null )
                    favoritesArray = new Array();

                // set Hook for favourites array
                setFavourtiessList(favoritesArray);
                // Resolves promise after chaneing data    
                resolve();
            } catch(e) {
                console.log("Something went wrong near aynsc favorites first data load");
                reject(e);
            }
        })
    }

    useEffect(() => {
        getAsyncStorageData();
    }, [])

    //Coin api data requests ####################################################
    const requestCoinListData = async () => {
        return new Promise(async (resolve, reject) => {
            axios
                .get('https://rest.coinapi.io/v1/assets?apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for coin list in favorites: ',res.status);
                    setCoinList(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    //Coin api icon data requests ####################################################
    const requestCoinIconListData = async () => {
        return new Promise(async (resolve, reject) => {
            axios
                .get('https://rest.coinapi.io/v1/assets/icons/'+iconDimensions+'?apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for icon list in favorites: ',res.status);
                    setCoinIconList(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    reject(error);
                })
        })
    }


    useEffect(() => {
        Promise.all(
            [
            requestCoinIconListData(),
            requestCoinListData(),
            ]
        );
    }, [])

    // console.log(" coinlist length: ",coinList.length);
    // console.log(" coinlist exchange rate length: ",coinExchangeRateList.find(subItem => subItem.asset_id_quote == "PLN"));
    // console.log(coinExchangeRateList.find(subItem => subItem.asset_id_quote == "PLN").rate);
    // console.log(typeof(coinExchangeRateList.find(subItem => subItem.asset_id_quote == "PLN").rate));
    // console.log(" coinlist icon length: ",coinIconList.length);


    // Custom elements ####################################################
    const Item = ({ item }, navigation) => (
        favourtiessList.includes(item.asset_id) ?
        <TouchableOpacity 
            style={[styles.item, { backgroundColor: checkIndexIsEven(item.type_is_crypto) ? '#99AEBB' : '#51BBE9'}]}
            onPress={() => navigation.navigate('Graph', {
                currencyName: item.asset_id,
                mainCurrencyName: currnecyApiRequestName,
                })}
            >
            <Image
                style={styles.currencyIcon}
                source={{uri: coinIconList.find(subItem => subItem.asset_id === item.asset_id) == null 
                    ? 'https://cdn-icons-png.flaticon.com/128/5169/5169216.png' :
                    coinIconList.find(subItem => subItem.asset_id === item.asset_id).url
                }}
            />
            <Text style={styles.title}>
                {item.name.length < 20
                    ? `${item.name}`
                    : `${item.name.substring(0, 32)}...`}
            </Text>
        </TouchableOpacity>
        : null
        );

    return (
        <View style={styles.container}>
            <FlatList
                data={coinList}
                renderItem={(item) => Item(item, navigation)}
                keyExtractor={item => item.asset_id}
            />
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
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#99AEBB',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 100,
      },
    title: {
        fontSize: 18,
        marginStart: 20,
      },
    currencyIcon: {
        width: 60,
        height: 60,
    },
    counter: {
        fontSize: 20,
        position: 'absolute',
        right: 20,
        maxWidth: 100,
        overflow: 'hidden',
    },

});

export default FavouritesScreen;
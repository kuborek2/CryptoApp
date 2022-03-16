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


let ExampleCoinData = [
    {
      "asset_id": "USD",
      "name": "US Dollar",
      "type_is_crypto": 0,
      "data_quote_start": "2014-02-24T17:43:05.0000000Z",
      "data_quote_end": "2022-03-16T17:55:46.1599599Z",
      "data_orderbook_start": "2014-02-24T17:43:05.0000000Z",
      "data_orderbook_end": "2020-08-05T14:38:00.7082850Z",
      "data_trade_start": "2010-07-17T23:09:17.0000000Z",
      "data_trade_end": "2022-03-16T17:58:45.6640000Z",
      "data_symbols_count": 100137,
      "volume_1hrs_usd": 1867842347258.98,
      "volume_1day_usd": 23978785037586.37,
      "volume_1mth_usd": 1101215572889127.9,
      "id_icon": "0a4185f2-1a03-4a7c-b866-ba7076d8c73b",
      "data_start": "2010-07-17",
      "data_end": "2022-03-16"
    },
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
    },
    {
        "asset_id": "NIS",
        "name": "NIS",
        "type_is_crypto": 1,
        "data_quote_start": "2018-01-24T00:42:50.1443495Z",
        "data_quote_end": "2022-03-16T17:52:02.7844230Z",
        "data_orderbook_start": "2018-01-24T00:42:50.1443495Z",
        "data_orderbook_end": "2020-08-05T14:37:37.8190850Z",
        "data_trade_start": "2013-03-15T12:48:43.0000000Z",
        "data_trade_end": "2020-06-25T13:09:04.0000000Z",
        "data_symbols_count": 8,
        "volume_1hrs_usd": 0,
        "volume_1day_usd": 0,
        "volume_1mth_usd": 0,
        "price_usd": 0.29642410289863413,
        "data_start": "2013-03-15",
        "data_end": "2022-03-16"
      }
]

let ExampleCoinIconData = [
    {
        "asset_id": "BTC",
        "url": "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/4caf2b16a0174e26a3482cea69c34cba.png"
    },
    {
        "asset_id": "USD",
        "url": "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/0a4185f21a034a7cb866ba7076d8c73b.png"
    },
]

let ExampleCoinExchangeRatesEuro = [
    {
        "time": "2022-03-16T19:12:44.4000000Z",
        "asset_id_quote": "BTC",
        "rate": 0.000027361876161065196
    },
    {
        "time": "2022-03-16T19:12:44.5000000Z",
        "asset_id_quote": "NIS",
        "rate": 3.6894116589882664
    },
    {
        "time": "2022-03-16T19:12:44.4000000Z",
        "asset_id_quote": "USD",
        "rate": 1.0994376837653563
    },
]

const Item = ({ item }) => (
    <View style={styles.item}>
        <Image
            style={styles.currencyIcon}
            source={{uri: ExampleCoinIconData.find(subItem => subItem.asset_id === item.asset_id) == null 
                ? 'https://cdn-icons-png.flaticon.com/128/5169/5169216.png' :
                ExampleCoinIconData.find(subItem => subItem.asset_id === item.asset_id).url
            }}
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.counter}>{ExampleCoinExchangeRatesEuro.find(subItem => subItem.asset_id_quote === item.asset_id) == null 
                ? '00.00' :
                ExampleCoinExchangeRatesEuro.find(subItem => subItem.asset_id_quote === item.asset_id).rate}</Text>
    </View>
  );

const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <FlatList
                    data={ExampleCoinData}
                    renderItem={Item}
                    keyExtractor={item => item.asset_id}
                />
            </View>
        </ScrollView>

        // <SafeAreaView style={styles.container}>
        // <FlatList
        // data={DATA}
        // renderItem={renderItem}
        // keyExtractor={item => item.id}
        // />
        // </SafeAreaView>

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
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 100,
      },
    title: {
        fontSize: 26,
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

export default HomeScreen;


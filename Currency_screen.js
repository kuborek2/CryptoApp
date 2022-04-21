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
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    ToastAndroid
  } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
    } from "react-native-chart-kit";
import { Children } from 'react/cjs/react.production.min';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const customData = require('./plnVSusd.json');
const customDataOneYear = require('./plnVSusd.json');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const coinApiKey = "E7BB5FA1-BAD5-4A32-86E2-E135C7A5006D";
// 8C18FFE2-77F9-43A2-B19D-294E7590D478 - wojtkowy
// 0241F9BA-25FA-4312-A838-A7913E667D2A - jakubwy
// DF7C3A9B-D7C7-40A0-B4C5-2AE781249E7D - wojtkowy drugi
// 358EDCE6-2D79-4BFA-BEDA-AA403745B09D another one

const config = {
    headers: {
        "Accept": "application/json",
        "Accept-Encoding": "deflate, gzip",
    }
}

const showToast = (message, isShort = true, gravity = ToastAndroid.CENTER) => {
    ToastAndroid.showWithGravity(message, (isShort ? ToastAndroid.SHORT : ToastAndroid.LONG), gravity);
  };


const exampleData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }
    ]
  };

const pointsOnChart = 20;

    // <View style={[styles.item, { backgroundColor: checkIndexIsEven(item.type_is_crypto) ? '#ee6b76' : '#36a873'}]}>

const prepareData = (dataToPrepare) => {
    if( dataToPrepare.length == 0 )
        return [];

    if( dataToPrepare == exampleData ){
        showToast("Data is not recived yet")
        return exampleData;
    }

    let labels = [
        Moment(dataToPrepare[0].time_period_start).format('MMMM Do YYYY'),
        Moment(dataToPrepare[dataToPrepare.length-1].time_period_end).format('MMMM Do YYYY')
    ];

    let spaceing = parseInt((dataToPrepare.length)/(pointsOnChart-1));

    let dataset = dataToPrepare.filter((elem, index, array) => (index)%spaceing == 0);
    dataset = dataset.map((item, index, array) => {
      return (item.rate_high+item.rate_low)/2;
    });

    let data = {
        labels: labels,
        datasets: [
            {
                data: dataset
            }
        ]
    };

    return data;
    }

const chartConfig = {
    backgroundColor: "#364954",
    backgroundGradientFrom: "#364954",
    backgroundGradientTo: "#364954",
    decimalPlaces: 2, // optional, defaults to 2dp
//   color: (opacity = 1) => `	rgb(0,0,0, ${opacity})`,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgb(255,255,255, ${opacity})`,
    style: {
    borderRadius: 16
    },
    propsForDots: {
    r: "5",
    strokeWidth: "0",
    stroke: "#ffa726"
    }
  };

const GraphChangeBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text>{props.name}</Text>
        </TouchableOpacity>
    );
}

// Period is just amount of indexes it must return, so if we pass json data which probs every 2 hours
// for 2 days we need to pass 48 indexes.
const ModifyData = (data, pierod) => {
    if( pierod > data.length ){
        console.log("pierod: ",pierod," vs data.length: ",data.length);
        pierod = data.length;
    }
    console.log("pierod: ",pierod)
    let modifiedData = [];
    for ( let i = 0; i < pierod; i++ ){
        modifiedData.push(data[i]);
    }
    return modifiedData;
}

const dataLengthChecker = (data) => {
    if( data.datasets !== undefined ){
        if( data.datasets[0] !== undefined ){
            if( data.datasets[0].data !== undefined ){
                return data.datasets[0].data.length;
            }
        }
    }
    return 0;
}

// Do poprawnego wyświetlania danych potrzebujemy conajmniej 40 punktów czyli.
// 100 points is the limit in coin api
// 1 Day -> 20MIN to coinapi
// 1 Week -> 2HRS to coinapi
// 1 Month -> 12HRS to coinapi
// 1 Year - > 5DAY to coin api

const CurrencyScreen = ({ route, navigation, mainCurrency }) => {

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log("called");
 
        // Call only when screen open or when back on screen 
        if(isFocused){ 
            getInitialData();
        } else {
            setIsUpdated(false);
        }
    }, [isFocused]);

    //Checking if params are actual
    const [isUpdated, setIsUpdated] = useState(false);

    //Hooks
    const [change, setChange] = useState('00.00'+"%")
    const [value, setValue] = useState('00.00'+mainCurrency)
    const [valueStyle, setValueStyle] = useState(styles.textBlack)
    const [data, setData] = useState(exampleData);
    const [isLoading, setIsLoading] = useState(false);

    // Hooks for taht from other screens
    const [currentCurrency, setCurrentCurrency] = useState(currencyName);
    const [isFavorite, setIsFavorite] = useState(false);

    //Current currecies to compare
    const [currencyName, setCurrencyName] = useState("");
    const [mainCurrencyName, setMainCurrencyName] = useState("")

    //Hooks for timely data
    const [dataOneDay, setDataOneDay] = useState(exampleData);
    const [dataOneWeek, setDataOneWeek] = useState(exampleData);
    const [dataOneMonth, setDataOneMonth] = useState(exampleData);
    const [dataOneYear, setDataOneYear] = useState(exampleData);

    const getInitialData = () => {
        console.log("changed inital data")
        let { currencyName, mainCurrencyName } = route.params;
        currencyName = currencyName.replace(/[\r\n]/gm, '');
        setCurrencyName(currencyName);
        setMainCurrencyName(mainCurrencyName);
        console.log("currency name: ",currencyName," mainCurrencyname: ",mainCurrencyName);
        setIsUpdated(true);
    }

    useEffect(() =>  {
        let preparedData = prepareData(customData);
        setData(preparedData);
    }, [])

        // Async storage secotion #################################################

        const saveAsyncStroageData = async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    // Load data
                    let favoritesArray = await AsyncStorage.getItem('FAVORITE_CURRENCIES');
                    favoritesArray = JSON.parse(favoritesArray);
                    console.log("favoritesArray in save: ");
                    console.log(favoritesArray)
    
                    // Check if empty -> if yes make empty table
                    if( favoritesArray === undefined || favoritesArray === null ){
                        favoritesArray = [];
                        favoritesArray.push(currencyName)
                        setIsFavorite(true);
                    } else {
                        if( !isFavorite ){
                            favoritesArray.push(currencyName)
                            setIsFavorite(true);
                        } else {
                            favoritesArray.pop(currencyName)
                            setIsFavorite(false);
                        }
                    }
                    favoritesArray = JSON.stringify(favoritesArray);
                    AsyncStorage.setItem('FAVORITE_CURRENCIES',favoritesArray);
                    console.log(isFavorite)
                    resolve();
                } catch(e) {
                    console.log("Something went wrong near aynsc favorites data change");
                    reject(e);
                }
            })
          }
    
        const getAsyncStorageData = async () => {
            return new Promise( async (resolve, reject) => {
                try {
                    //Load data
                    let favoritesArray = await AsyncStorage.getItem('FAVORITE_CURRENCIES');
                    favoritesArray = JSON.parse(favoritesArray);
                    console.log("favoritesArray in get: ",typeof(favoritesArray));
                    console.log("favoritesArray in get: ",favoritesArray);
                    console.log("if in tabel includes: ",favoritesArray.includes(currencyName))
    
                    //Check if empty -> if yes make empty table
                    if( favoritesArray === undefined || favoritesArray === null )
                        favoritesArray = new Array();
    
                    // set Hook for button text
                    if( favoritesArray.includes(currencyName) ){
                        console.log("chaneing setisfavorrite to true")
                        setIsFavorite(true);
                    } else {
                        setIsFavorite(false);
                    }
                    // Resolves promise after chaneing data    
                    resolve();
                } catch(e) {
                    console.log("Something went wrong near aynsc favorites first data load");
                    reject(e);
                }
            })
        }
    
        useEffect(() => {
            if( isUpdated )
                getAsyncStorageData();
                
        }, [isUpdated])

    // Loading data from coin api section ####################################

    const requestOneDayData = async () => {
        return new Promise(async (resolve, reject) => {
            let pierod = "20MIN"
            // time end
            let time_end = Moment().format();
            time_end = time_end.substring(0, time_end.length-6)

            // time start
            let time_start = Moment().subtract(1,'day').format();
            time_start = time_start.substring(0, time_start.length-6)

            axios
                .get('https://rest.coinapi.io/v1/exchangerate/'+currencyName+'/'+mainCurrencyName+'/history?period_id='+pierod+'&time_start='+time_start+'&time_end='+time_end+'&apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for coin list: ',res.status);
                    setDataOneDay(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    setDataOneDay(exampleData);
                    reject(error);
                })
        })
    }

    //Coin api icon data requests ####################################################
    const requestOneWeekData = async () => {
        return new Promise(async (resolve, reject) => {
            let pierod = "2HRS"
            // time end
            let time_end = Moment().format();
            time_end = time_end.substring(0, time_end.length-6)

            // time start
            let time_start = Moment().subtract(7,'day').format();
            time_start = time_start.substring(0, time_start.length-6)

            axios
                .get('https://rest.coinapi.io/v1/exchangerate/'+currencyName+'/'+mainCurrencyName+'/history?period_id='+pierod+'&time_start='+time_start+'&time_end='+time_end+'&apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for coin list: ',res.status);
                    setDataOneWeek(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    setDataOneWeek(exampleData);
                    reject(error);
                })
        })
    }

    //Coin api exchange rate data requests ####################################################
    const requestOneMonthData = async () => {
        return new Promise(async (resolve, reject) => {
            let pierod = "12HRS"
            // time end
            let time_end = Moment().format();
            time_end = time_end.substring(0, time_end.length-6)

            // time start
            let time_start = Moment().subtract(30,'day').format();
            time_start = time_start.substring(0, time_start.length-6)

            axios
                .get('https://rest.coinapi.io/v1/exchangerate/'+currencyName+'/'+mainCurrencyName+'/history?period_id='+pierod+'&time_start='+time_start+'&time_end='+time_end+'&apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for coin list: ',res.status);
                    setDataOneMonth(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    setDataOneMonth(exampleData);
                    reject(error);
                })
        })
    }

    const requestOneYearhData = async () => {
        return new Promise(async (resolve, reject) => {
            let pierod = "5DAY"
            // time end
            let time_end = Moment().format();
            time_end = time_end.substring(0, time_end.length-6)

            // time start
            let time_start = Moment().subtract(1,'year').format();
            time_start = time_start.substring(0, time_start.length-6)

            axios
                .get('https://rest.coinapi.io/v1/exchangerate/'+currencyName+'/'+mainCurrencyName+'/history?period_id='+pierod+'&time_start='+time_start+'&time_end='+time_end+'&apikey='+coinApiKey, config)
                .then(res => {
                    console.log('statusCode for coin list: ',res.status);
                    setDataOneYear(res.data);
                    // console.log(res.data[0])
                    resolve();
                })
                .catch(error => {
                    setDataOneYear(exampleData);
                    reject(error);
                })
        })
    }

    useEffect(() => {
        if( isUpdated )
            Promise.all(
                [
                    requestOneDayData(),
                    requestOneWeekData(),
                    requestOneMonthData(),
                    requestOneYearhData()
                ]
            );
    }, [isUpdated])

    // ACustom graph items section #################################################

    const customDotColors = (dataPoint, dataPointIndex) => {
        if(dataPointIndex == 0)
            return '#36a873';
        
        return data.datasets[0].data[dataPointIndex-1] > data.datasets[0].data[dataPointIndex] ? '#ee6b76' : '#36a873';
    }

    const customDataPointClick = ({value, dataset, getColor}) => {
        let index = dataset.data.indexOf(value);
        if( index == 0 ){
            setChange('00.00'+"%")
            setValue(value.toFixed(2)+mainCurrency)
            setValueStyle(styles.textBlack)
            return;
        }
        let change = ((dataset.data[index]/dataset.data[index-1])-1).toPrecision(2);
        if( change == 0 )
            setValueStyle(styles.textBlack)
        else if ( change > 0 )
            setValueStyle(styles.textGreen)
        else
            setValueStyle(styles.textRed)
        setChange(change+"%");
        setValue(value.toFixed(2)+mainCurrency)
    }

    // Change data on graph #################################################

    const reloadData = (data) => {
        setIsLoading(true);
        // let modifiedData = ModifyData(data, pierod);
        let preparedData = prepareData(data);
        setData(preparedData);
        setIsLoading(false);
    }

    return (
        !isLoading ? (
            <View style={styles.headerContainer}>
                <Text style={[styles.headerBox, styles.headerBox, styles.leftHeaderText,]}>
                    {currencyName} {value}
                </Text>

                <View style={styles.separator}/>

                <Text style={[styles.headerBox, styles.rightHeaderText, valueStyle]}>
                    {change}
                </Text>

                <View style={styles.separator}/>

                <View style={{margin: 10}}>
                    <LineChart
                        data={dataLengthChecker(data) > 0 ? data : exampleData}
                        width={windowWidth-30}
                        height={220}
                        chartConfig={chartConfig}
                        getDotColor={customDotColors}
                        onDataPointClick={customDataPointClick}
                        bezier
                        />
                </View>

                <View style={styles.separator}/>

                <View style={styles.buttonsContainer}>
                    <GraphChangeBtn name={"1D"} onPress={() => reloadData(dataOneDay)} /> 
                    <GraphChangeBtn name={"1W"} onPress={() => reloadData(dataOneWeek)} />
                    <GraphChangeBtn name={"1M"} onPress={() => reloadData(dataOneMonth)} />
                    <GraphChangeBtn name={"1Y"} onPress={() => reloadData(dataOneYear)} />
                </View>

                <View style={styles.separator}/>

                <Button
                    onPress={() => saveAsyncStroageData()}
                    title={!isFavorite ? "Add to favorites" : "Remove from favorites"}
                    color="#51bbe9"
                    />

                <View style={styles.separator}/>

                {/* <TouchableOpacity
                    styles={[styles.button, {width: '45%'}]}
                    onPress={() => {console.log("xd")}}
                >
                    <Text>{isFavorite}</Text>
                </TouchableOpacity> */}

            </View>
        ) : (
            <View 
                style={{        
                    justifyContent:'center',
                    alignItems:'center',}}
                >
                <Text>{isFavorite}</Text>
            </View>
        )
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: StatusBar.currentHeight || 0,
        // backgroundColor: '#51bbe9',
        // backgroundColor: '#99aebb',
        backgroundColor: '#364954',
        height: '100%',
        },
    headerBox: {
        height: 40,
        margin: 10,
        fontSize: 30,
        color: '#FFFFFF'
        },
    separator: {
        alignSelf: 'center',
        height: 0,
        width: '85%',
        borderWidth: 1.5,
    },
    buttonsContainer: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        color: '#FFFFFF',
        fontSize: 30,
        backgroundColor: '#51bbe9',
        height: 40,
        width: 40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 8,
        
        backgroundColor:'#51bbe9',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    leftHeaderText: {
        textAlign: 'left',
        },
    rightHeaderText: {
        textAlign: 'right',
        },
    textBlack: {
        color: '#FFFFFF',
        },
    textRed: {
        color: '#ee6b76',
        },
    textGreen: {
        color: '#36a873',
        },

});

export default CurrencyScreen;

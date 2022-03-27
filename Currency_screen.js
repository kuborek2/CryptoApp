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
    Dimensions ,
  } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
    } from "react-native-chart-kit";
import { Children } from 'react/cjs/react.production.min';
import Moment from 'moment';

const customData = require('./btcVsusd.json');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pointsOnChart = 20;



    // <View style={[styles.item, { backgroundColor: checkIndexIsEven(item.type_is_crypto) ? '#99AEBB' : '#51BBE9'}]}>

const prepareData = (dataToPrepare) => {
    let labels = [
        Moment(dataToPrepare[0].time_period_start).format('MMMM Do YYYY'),
        Moment(dataToPrepare[dataToPrepare.length-1].time_period_end).format('MMMM Do YYYY')
    ];

    let spaceing = parseInt((dataToPrepare.length)/(pointsOnChart-1));
    console.log("this is spcaeing: "+spaceing);

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
    backgroundColor: "#51bbe9",
    //   backgroundGradientFrom: "#fb8c00",
    //   backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
  };

const CurrencyScreen = ({ navigation }) => {  
    const [data, setData] = useState({
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
      });
    useEffect(() =>  {
        setData(prepareData(customData));
    }, [])

    // useEffect(() => {
    //     console.log("xd - 1")
    //     if( customData // 👈 null and undefined check
    //         && Object.keys(customData).length === 0
    //         && Object.getPrototypeOf(customData) === Object.prototype ){}
    //     else {
    //         setData(prepareData(customData));
    //         console.log("xd - 2")
    //     }

    //     if( data // 👈 null and undefined check
    //         && Object.keys(data).length === 0
    //         && Object.getPrototypeOf(data) === Object.prototype ){}
    //     else {
    //         setIsLoaded(true);
    //         console.log(data)
    //         console.log("xd - 3");
    //     }

    // }, [data]);

    return (
        <View>
            <LineChart
                data={data}
                width={windowWidth}
                height={220}
                chartConfig={chartConfig}
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

});

export default CurrencyScreen;


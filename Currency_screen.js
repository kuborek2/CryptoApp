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



    // <View style={[styles.item, { backgroundColor: checkIndexIsEven(item.type_is_crypto) ? '#ee6b76' : '#36a873'}]}>

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
      backgroundGradientFrom: "#51bbe9",
      backgroundGradientTo: "#51bbe9",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgb(54, 73, 84, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "5",
        strokeWidth: "0",
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

    const customDotColors = (dataPoint, dataPointIndex) => {
        if(dataPointIndex == 0)
            return '#36a873';
        
        return data.datasets[0].data[dataPointIndex-1] > data.datasets[0].data[dataPointIndex] ? '#ee6b76' : '#36a873';
    }

    return (
        <View>
            <LineChart
                data={data}
                width={windowWidth}
                height={220}
                chartConfig={chartConfig}
                getDotColor={customDotColors}
                bezier
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


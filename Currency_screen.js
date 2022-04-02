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
            // onPress={onPress}
        >
            <Text>{props.name}</Text>
        </TouchableOpacity>
    );
}



const CurrencyScreen = ({ navigation, mainCurrency }) => { 
    const [change, setChange] = useState('00.00'+"%")
    const [value, setValue] = useState('00.00'+mainCurrency)
    const [valueStyle, setValueStyle] = useState(styles.textBlack)
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

    return (
        <View style={styles.headerContainer}>
            <Text style={[styles.headerBox, styles.headerBox, styles.leftHeaderText,]}>
                BTC {value}
            </Text>

            <View style={styles.separator}/>

            <Text style={[styles.headerBox, styles.rightHeaderText, valueStyle]}>
                {change}
            </Text>

            <View style={styles.separator}/>

            <View style={{margin: 10}}>
                <LineChart
                    data={data}
                    width={windowWidth}
                    height={220}
                    chartConfig={chartConfig}
                    getDotColor={customDotColors}
                    onDataPointClick={customDataPointClick}
                    bezier
                    />
            </View>

            <View style={styles.separator}/>

            <View style={styles.buttonsContainer}>
                <GraphChangeBtn name={"1D"}/>
                <GraphChangeBtn name={"1W"}/>
                <GraphChangeBtn name={"1M"}/>
                <GraphChangeBtn name={"1Y"}/>
            </View>

            <View style={styles.separator}/>

        </View>
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


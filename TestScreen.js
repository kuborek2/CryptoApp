import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

  const Tab = createBottomTabNavigator();

const TestScreen = ({ navigation }) => {


return (
<View>
<Text style={styles.home_text}>Home!</Text>
</View>
);

}


const styles = StyleSheet.create({
home_text:{
    fontSize:35,
},

});

export default TestScreen;
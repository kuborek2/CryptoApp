/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TermsOfUsage from './TermsOfUsage';
import TestScreen from './TestScreen';



const Tab = createBottomTabNavigator();
const App = ({ navigation }) =>  {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <NavigationContainer>
      <Tab.Navigator>

      

      <Tab.Screen name="Home" component={TestScreen} />
      <Tab.Screen name="Favourite" component={TermsOfUsage} />
        
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
 mainAppText:{
   fontSize:35,
 },
});

export default App;

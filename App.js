/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
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
import HomeScreen from './HomeScreen';
import CurrencyScreen from './Currency_screen';
import FavouritesScreen from './FavouritesScreen';

LogBox.ignoreAllLogs();

if (!__DEV__) {
  // eslint-disable-line no-undef
  [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ].forEach(methodName => {
    console[methodName] = () => {
      /* noop */
    };
  });
}

import SettingsScreen from './SettingsScreen';


  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();



  const App = ({ navigation }) =>  {

    const [mainCurrency, setMainCurrency] = useState('€');

    function HomeTabs() {


      return (
        <Tab.Navigator
          initialRouteName="Home"
          >

          {/* Fav SCREEN SECTION ##################################### */}
          <Tab.Screen name="Favourites" component={FavouritesScreen} 
            unmountInactiveRoutes= {true}
            options={{
              tabBarIcon: ({size}) => (<Icon name="staro" color="#364954" size={size} />)
            }}/>
          
          {/* Currency details SCREEN SECTION ##################################### */}
          {/* <Tab.Screen name="Graph">
            {(props) => <CurrencyScreen {...props} mainCurrency={mainCurrency} />}
          </Tab.Screen> */}
          
          {/* HOME SCREEN SECTION ##################################### */}
          <Tab.Screen name="Home"
            options={{
              tabBarIcon: ({size}) => (<Icon name="home" color="#364954" size={size} />)
            }}>
            {(props) => <HomeScreen {...props} mainCurrency={mainCurrency} />}
          </Tab.Screen>

            {/* SETTINGS SCREEN SECTION ##################################### */}
          <Tab.Screen name="Settings"
            options={{
              tabBarIcon: ({size}) => (<Icon name="setting" color="#364954" size={size} />)
            }}>
            {(props) => <SettingsScreen {...props} mainCurrency={mainCurrency} />}
          </Tab.Screen>

        </Tab.Navigator>
      );
    }
  
    function App() {
      return (
        <Stack.Navigator 
          initialRouteName="TOS"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="TOS" component={TermsOfUsage} />
          <Stack.Screen name="Graph">
            {(props) => <CurrencyScreen {...props} mainCurrency={mainCurrency} />}
          </Stack.Screen>
        </Stack.Navigator>
      );
    }

  return (

    <NavigationContainer>
      <App/>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
 mainAppText:{
   fontSize:35,
 },
});

export default App;

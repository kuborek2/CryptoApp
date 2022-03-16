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
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import HomeScreen from './HomeScreen';



  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();



  const App = ({ navigation }) =>  {

  function HomeTabs() {
    return (
      <Tab.Navigator>

        <Tab.Screen name="Test" component={TestScreen} 
           options={{
            tabBarIcon: ({size}) => (<Icon name="home" color="#364954" size={size} />)
        }}
        />
        
         
        
        <Tab.Screen name="Home" component={HomeScreen} />
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

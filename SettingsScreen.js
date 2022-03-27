import React, { useEffect, useState }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import TermsOfUsage from './TermsOfUsage';
 

const SettingsScreen = ({ navigation }) => {

    const moveToTerms = () => {

        
        
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.termsText}>Settings</Text>
            <View>
            <Text>Go to ToS</Text>
            <Button title='Go to Terms' onPress={() => navigation.navigate('TOS', { screen: 'TermsOfUsage' })}/>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container:{
        minHeight:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        
    },
    termsText:{
        fontSize:30,
        textAlign:'center',
        alignItems:'center',
        paddingTop:3,

    },
    splitSettings:{
        display:'flex',
        justifyContent:'space-between',
    }
});

export default SettingsScreen;
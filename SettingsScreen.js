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
            <View style={styles.splitSettings}>
                <Text style={styles.termsText}>Settings</Text>
                
                <Button title='Go to Terms' onPress={() => navigation.navigate('TOS', { screen: 'TermsOfUsage' })}/>
            </View>
    
        </View>
    );

}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
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
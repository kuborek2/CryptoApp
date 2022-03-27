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

const SettingsScreen = ({ navigation }) => {

    const moveToTerms = () => {

        
        
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.termsText}>Settings</Text>
            <View style={{ flex:1, justifyContent:'center',}}>
            <Text style={styles.settingText}>Go to ToS</Text>
            <Button style={{paddingTop:5,}} title='Go to Terms' onPress={() => navigation.navigate('TOS', { screen: 'TermsOfUsage' })}/>
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
    },
    settingText:{
        fontSize:20,
        textAlign:'center',
    }
});

export default SettingsScreen;
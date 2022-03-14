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


 

const TermsOfUsage = ({ navigation }) => {

    const [tos , SetTos] = useState(false);


    const acceptTerms = async () => {
        SetTos(true);  
        AsyncStorage.setItem('acceptThisTerms','true');    
    }
    

    useEffect(() => {
        const getData = async () => {
            try {
              const termsReading = await AsyncStorage.getItem('acceptThisTerms')
              if(termsReading != null) {
               SetTos(true);                
              }
            } catch(e) {
              
            }
          }
          getData();
    },[])

 



    const Tab = createBottomTabNavigator();

if( !tos ){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.termsText}>Terms of Usage</Text>
                <Text style={styles.termsBigText}>
                Lorep ipmsum Lorep ipmsum
                Lorep ipmsum Lorep ipmsum
                Lorep ipmsum Lorep ipmsum
                Lorep ipmsum Lorep ipmsum
                Lorep ipmsum Lorep ipmsum
                Lorep ipmsum Lorep ipmsum
                <Button title='Zaakceptuj' onPress={() => acceptTerms()}/>
                </Text>
            </View>
    
        </View>
    );
}else {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.termsText}>Working</Text>
                
            </View>
    
        </View>
    );
}


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
    termsBigText:{
        fontSize:25,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default TermsOfUsage;
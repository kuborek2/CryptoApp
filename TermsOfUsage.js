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

    const acceptTerms = async () => {
        AsyncStorage.setItem('acceptThisTerms','false'); 
        navigation.navigate('HomeTabs');      
    }
    

    useEffect(() => {
        const getData = async () => {
            try {
              const termsReading = await AsyncStorage.getItem('acceptThisTerms')
              if(termsReading != null) {         
                //navigation.navigate('HomeTabs');   
              }
            } catch(e) {
              
            }
          }
          getData();
    },[])


    return (

       
            <View style={{minHeight:'100%',minWidth:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.termsText}>CoinApp Terms and Conditions</Text>
                <View style={{display:'flex',height:'60%', justifyContent:'center',alignContent:'center',}}>
                    <Text style={{textAlign:'center',fontSize:25,}}>
                        This app is free to use and share !
                    </Text>
                    <Text style={{textAlign:'center',fontSize:25,marginTop:10,}}>
                    Enjoy!
                    </Text>
                </View>
                <View style={{}}>
                    <View style={{display:'flex',flexDirection:'row',marginTop:'5%',paddingBottom:'5%',}}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={onCheckboxClick }
                            style={styles.checkbox}                            
                        /> 
                        <Text style={{marginTop:5}}>I have read and accept Terms and Conditions</Text>
                    </View>
                    <TouchableOpacity style={ isSelected ? styles.acceptButton : styles.disabledButton  } onPress={() => acceptTerms()} disabled={isDisabled}>
                        <Text style={{fontSize:25, color:'white',}}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
               
       

    );

}


const styles = StyleSheet.create({


  

    termsText:{
        fontSize:30,
        textAlign:'center',
        alignItems:'center',
        paddingTop:3,

    },

    
    acceptButton:{
       
        height:65,
        width:350,
        
        justifyContent:'center',
        alignItems:'center',
        
        backgroundColor:'#51bbe9',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    disabledButton:{
        height:65,
        width:350,
        backgroundColor:'#364954',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        
    },


});

export default TermsOfUsage;
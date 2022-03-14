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
  import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


 

const TermsOfUsage = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);
    
    

 

    const acceptTerms = async () => {
        AsyncStorage.setItem('acceptThisTerms','true'); 
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
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center',minHeight:'30%', minWidth:100,}}>
                <Text style={styles.termsText}>Mobile app Terms and Conditions</Text>
                <Text style={styles.termsBigText}>
                    Clicking button accept you agreed to CoinApp Terms of Servie and Privacy Policy
                </Text>
                <View style={{display:'flex',flexDirection:'row',marginTop:'5%',paddingBottom:'5%',}}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={ setSelection }
                        style={styles.checkbox}
                    /> 
                    <Text style={{marginTop:5}}>I have read and accept Terms and Conditions</Text>
                </View>
                <View style={{paddingTop:'90%'}}>
                    <TouchableOpacity style={ isSelected ? styles.acceptButton : styles.disabledButton  } onPress={() => acceptTerms()} disabled={() =>setSelection(!isSelected)}>
                        <Text style={{fontSize:25,}}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
               
        </View>
    );

}




const styles = StyleSheet.create({

    container:{
        maxHeight:'100%',
        maxWidth:'100%',
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
        marginTop:'10%',
        fontSize:25,
        justifyContent:'center',
        alignItems:'center',
        padding:6,
    },
    acceptButton:{
       
        height:50,
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
        height:50,
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
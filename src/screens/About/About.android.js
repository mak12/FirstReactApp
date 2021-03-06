import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AboutImage from 'images/star.png'

export default class About extends Component {

     static navigationOptions ={
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Image 
            source={ AboutImage } 
            style={ [styles.icon, {tintColor} ]} 
            />
        ),
        tabBarLabel: 'About'
    }
    
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          padding: 20
        }}>
          About
        </Text>
        <Text style= {{ 
        fontSize: 14, 
        textAlign: 'center' , 
        padding: 20
            }}>
        This screen was made for Android
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    
    icon:{
        height: 24,
        resizeMode: 'contain'
    }
   
});
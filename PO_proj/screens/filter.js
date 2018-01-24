import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class filter extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
 header: null
 }

 render(){
 const { navigate } = this.props.navigation;
 return (
  <View style={styles.container}>
 	  <View style={styles.buttonContainer}>
      <Button
      title = "Worker"
      color = "white"
      onPress={()=> navigate('WK')}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "By Carrier"
      color = "white"
      onPress={()=> navigate('WK')}
      />
    </View>

     	  <View style={styles.buttonContainer}>
      <Button
      title = "By Date"
      color = "white"
      onPress={()=> navigate('WK')}
      />
    </View>

  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  buttonContainer: {
    margin: 20
  },

});
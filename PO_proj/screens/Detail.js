import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'

export default class Detail extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
    title: 'Detail Page',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'}
 }
 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (
 <View style={styles.container}>
      <Text style={{fontSize:15}}> Tracking No: {params.trackno} </Text>
      <Text style={{fontSize:15}}> Carrier: {params.carrier} </Text>
      <Text style={{fontSize:15}}> Name: {params.name} </Text>
      <Text style={{fontSize:15}}> Status: {params.status} </Text>
      <Text style={{fontSize:15}}> Date: {params.month}/{params.day}/{params.year} </Text>
 </View>
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20
  },

});

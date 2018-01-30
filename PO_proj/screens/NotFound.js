import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar, CheckBox, Icon } from 'react-native-elements';

export default class NotFound extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
    title: 'Search Result',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white', fontSize:20},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
 }
 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (
 <View style={styles.container}>
 <View style={styles.cardContainer}>
  <Icon size={30} name='find-in-page' type='material-icons' />
  <Text style={{fontSize:30}}> Not Found </Text>
   
  </View>
      
 </View>
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: 100,
    height: 100,
    width: 250,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

});

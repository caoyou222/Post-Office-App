import React, { Component } from 'react';
import {TextInput, Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar } from 'react-native-elements';

export default class filter extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
 title: 'Search Packages'
 }

 render(){
 const { navigate } = this.props.navigation;
 return (
  <View style={styles.container}>
  <SearchBar
  lightTheme
  // onChangeText={someMethod}
  // onClearText={someMethod}
  icon={{ type: 'font-awesome', name: 'search' }}

  placeholder='Enter tracking number, student name ...' />

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Carrier"
      color = "black"
      onPress={()=> navigate('WK')}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Date"
      color = "black"
      onPress={()=> navigate('WK')}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Student ID"
      color = "black"
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
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20
  },

});
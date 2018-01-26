import React, { Component } from 'react';
import {TextInput, Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar, CheckBox, Icon } from 'react-native-elements';

export default class filter extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
 title: 'Search Packages',
 headerStyle: {backgroundColor: '#d69523'},
 headerTitleStyle: {color:'white'},
 headerBackTitleStyle: {color:'white'},
 headerTintColor: 'white'
 }



 render(){
 const { navigate } = this.props.navigation;
 return (
  <View style={styles.container}>
  	<View style={styles.searchbar}>
	  <SearchBar
	  lightTheme
	  // onChangeText={someMethod}
	  // onClearText={someMethod}
	  icon={{ type: 'font-awesome', name: 'search' }}

	  placeholder='Enter tracking number, student name ...' />
 	 </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Carrier"
      color = "black"
      onPress={()=> navigate('WK')}
      />
      <View style={styles.checkContainer}>
      <CheckBox
		  title='UPS'
		  checked={this.state.checked}
		/>
		<CheckBox
		  title='UPSP'
		  checked={this.state.checked}
		/>
		<CheckBox
		  title='Fedex'
		  checked={this.state.checked}
		/>
		<CheckBox
		  title='DHl'
		  checked={this.state.checked}
		/>
	  </View>
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

    <View style={styles.buttonContainer}>
      <Button
      title = "Search"
      color = "black"
      onPress={()=> navigate('WK')}
      />
    </View>

    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM')}
      />
    </View>

  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 10,
  },
  checkContainer: {
  },
  bottomContainer:{
    position:'absolute',
    height: 55,
    justifyContent:'center',
    bottom: 0,
    right: 0,
    left: 0
  },

});
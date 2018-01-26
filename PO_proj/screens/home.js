import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Vibration, TouchableHighlight, ImageBackground} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';

export default class home extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 // backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
    header: null,
 }
 render(){
 const { navigate } = this.props.navigation;
 return (
  <ImageBackground 
    source = {{uri: 'https://wp.stolaf.edu/virtual/files/2013/02/campus_51.jpg'}}
    style = {styles.backgroundImage}
    blurRadius={3}
    opacity = {0.8}
    resizeMode='cover'>
  <View style={styles.container}>
  <View style={{marginTop: -50,padding: 20}}>
  <Text style={{fontFamily: 'ArialRoundedMTBold', fontSize: 40, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', alignSelf:'center'}}>
  Welcome!
  </Text>
  </View>
 	<View style={styles.buttonContainer}>
    <Button
    textStyle={{fontSize:25, fontWeight:'bold'}}
    buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
    title = "Worker"
    color = "white"
    iconRight={{name: 'work', type: 'material-icon', color:'white', size:24}}

    onPress={()=> navigate('WK')}
    />
  </View>

  <View style={styles.buttonContainer}>
    <Button
    textStyle={{fontSize:25, fontWeight:'bold'}}
    buttonStyle = {{alignSelf: 'center', width: 250,backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
    title = "Student"
    color = "white"
    iconRight={{name: 'user', type: 'font-awesome', color:'white', size:24}}
    onPress={()=> navigate('ST')}
    />
  </View>
  <View style={styles.buttonContainer}>
    <Button
    textStyle={{fontSize:25, fontWeight:'bold'}}
    buttonStyle = {{alignSelf: 'center', width: 250,backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
    title = "Track Package"
    color = "white"
    iconRight={{name: 'truck', type: 'font-awesome', color:'white', size:24}}
    onPress={()=> navigate('TK')}
    />
  </View>
  <View style={styles.buttonContainer}>
    <Button
    title = "Sign Out"
    buttonStyle={{backgroundColor: 'transparent'}}
    color = "white"
    iconRight={{name: 'log-out', type: 'entypo', color:'white', size:24}}
    onPress={()=> navigate('SI')}
    />
  </View>

 </View>
 </ImageBackground>
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
    backgroundColor:'transparent'
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch'
  }

});

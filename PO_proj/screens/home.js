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
 header: null
 }
 render(){
 const { navigate } = this.props.navigation;
 return (
  <ImageBackground 
    source = {{uri: 'https://wp.stolaf.edu/virtual/files/2013/02/campus_51.jpg'}}
    style = {styles.backgroundImage}
    blurRadius={1}
    opacity = {0.8}
    resizeMode='cover'>
  <View style={styles.container}>
  <View style={{marginTop: -50}}>
  <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', alignSelf:'center'}}>
  Welcome to Package Manager!
  </Text>
  </View>
 	<View style={styles.buttonContainer}>
          <Button
          textStyle={{fontSize:25, fontWeight:'bold'}}
          buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
          title = "Worker"
          color = "white"
          onPress={()=> navigate('WK')}
          />
        </View>

  <View style={styles.buttonContainer}>
          <Button
          textStyle={{fontSize:25, fontWeight:'bold'}}
          buttonStyle = {{alignSelf: 'center', width: 250,backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
          title = "Student"
          color = "white"
          onPress={()=> navigate('ST')}
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

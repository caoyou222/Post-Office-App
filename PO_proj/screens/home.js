import React, { Component } from 'react';
import {Image, Text, StyleSheet, ImageBackground, View, Dimensions, Vibration, TouchableHighlight} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {Button, Icon} from 'react-native-elements'


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
 const { params } = this.props.navigation.state;
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
  Welcome, {params.user}! 
  </Text>
  </View>
 	<View style={styles.buttonContainer}>
          <Button
          textStyle={{fontSize:25, fontWeight:'bold'}}
          buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
          title = "Worker"
          iconRight={{name: 'work', type: 'material-icon', color:'grey'}}
          color = "grey"
          buttonStyle={{backgroundColor: '#eae0cd'}}
          onPress={()=> navigate('WK')}
          />
        </View>

  <View style={styles.buttonContainer}>
          <Button
          textStyle={{fontSize:25, fontWeight:'bold'}}
          buttonStyle = {{alignSelf: 'center', width: 250,backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
          title = "Student"
          iconRight={{name: 'user', type: 'font-awesome', color:'grey'}}
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
          onPress={()=> navigate('ST')}
          />
        </View>
  <View style={styles.buttonContainer}>
          <Button
          title = "Track Package"
          iconRight={{name: 'truck', type: 'font-awesome', color:'grey'}}
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
          onPress={()=> navigate('TK')}
          />
        </View>
  <View style={styles.buttonContainer}>
          <Button
          title = "Log Out"
          iconRight={{name: 'log-out', type: 'entypo', color:'grey'}}
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
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

import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'

export default class student extends React.Component {
  _getPackage(){
    fetch("")
 .then((res) => {
 // console.log(res)
 return res.json()
 })
 .then((data) => {
 console.log(data)
 })
}

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
          title = "Home"
          color = "white"
          onPress={()=> navigate('HM')}
          />
        </View>
 </View>
 );
}
} 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

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

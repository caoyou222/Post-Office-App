import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'

export default class worker extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
 header: null
 }

function addPackage {
  fetch('url', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstParam: 'aaa',
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson.Message;
    })
    .catch((error) => {
      console.error(error);
    });
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

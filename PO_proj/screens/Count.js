import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'

//GMC: 28434-28436
//CY: 28425-28427
export default class Count extends React.Component {
  _getCount(){
    fetch("http://rns202-5.cs.stolaf.edu:28425/packages")
 .then((res) => {
 return res.json()
 })
 .then((data) => {
 console.log(data)
 })
}
  _addCount(){
    fetch("http://162.210.90.19:3000", {
 method: "POST"
 })
 .then((res) => {
 if (res.ok) {
 console.log("it worked!")
 } else {
 console.log("nope")
 }
 })
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
          title = "getCount"
          color = "blue"
          onPress = {this._getCount}
          />
        </View>

    <View style={styles.buttonContainer}>
          <Button
          title = "addCount"
          color = "red"
          onPress = {this._addCount}
          />
        </View>

    <View style={styles.buttonContainer}>
          <Button
          title = "Home"
          color = "black"
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
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20
  },

});

import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration, TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation'


export default class home extends React.Component {
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
          title = "Worker"
          color = "white"
          onPress={()=> navigate('WK')}
          />
        </View>

  <View style={styles.buttonContainer}>
          <Button
          title = "Student"
          color = "white"
          onPress={()=> navigate('ST')}
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

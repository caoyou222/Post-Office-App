import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Vibration, TouchableHighlight} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'


export default class home extends React.Component {
 constructor(props){
 super(props);
 }
 static navigationOptions = {
    title: 'Home',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
 }
 render(){
 const { navigate } = this.props.navigation;
 return (
 <View style={styles.container}>
 	<View style={styles.buttonContainer}>
          <Button
          title = "Worker"
          color = "grey"
          buttonStyle={{backgroundColor: '#eae0cd'}}
          onPress={()=> navigate('WK')}
          />
        </View>

  <View style={styles.buttonContainer}>
          <Button
          title = "Student"
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
          onPress={()=> navigate('ST')}
          />
        </View>
  <View style={styles.buttonContainer}>
          <Button
          title = "Track Package"
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
          onPress={()=> navigate('TK')}
          />
        </View>
  <View style={styles.buttonContainer}>
          <Button
          title = "Sign Out"
          buttonStyle={{backgroundColor: '#eae0cd'}}
          color = "grey"
          onPress={()=> navigate('SI')}
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
  },
  buttonContainer: {
    margin: 20
  },

});

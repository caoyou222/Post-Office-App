import React, { Component } from 'react';
import {AppRegistry, TextInput, Image, Text, StyleSheet, Button, View, Dimensions, Alert, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class addPack extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 monthText: '',
 dayText: '',
 yearText: '',
 trackText: '',
 carrierText: '',
 firstText: '',
 lastText: '',
 signText: ''
 }; 
 }
 static navigationOptions = {
 header: null
 }

  // function addPackage() {
  //   var package = {
  //     month = this.state.monthText
  //     day = this.state.dayText
  //     year = this.state.yearText
  //     trackingnum = this.state.trackText
  //     carrier = this.state.carrierText
  //     first = this.state.firstText
  //     last = this.state.lastText
  //     sign = this.state.signText
  //   };
  //   fetch('http://rns202-3.cs.stolaf.edu:28434', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(package)
  //   }).then((response) => response.json())
  //     .then((responseJson) => {
  //       return responseJson.Message;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

 render(){
 const { navigate } = this.props.navigation;
 return (
  <View style={styles.container}>
 	  <View style={styles.buttonContainer}>
      <Button
      title = "Worker"
      color = "black"
      onPress={()=> navigate('WK')}
      />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
    style={{width: 200, height: 40, borderColor:'gray', borderWidth: 1}}
    placeholder="Traking number"
    onChangeText={(trackText) => this.setState({trackText})}
    value={this.state.trackText}
    />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
    style={{width: 200, height: 40, borderColor:'gray', borderWidth: 1}}
    placeholder="Carrier"
    onChangeText={(carrierText) => this.setState({carrierText})}
    value={this.state.carrierText}
    />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
    style={{width: 200, height: 40, borderColor:'gray', borderWidth: 1}}
    placeholder="First name"
    onChangeText={(firstText) => this.setState({firstText})}
    value={this.state.firstText}
    />
    </View>
    <View style={styles.inputContainer}>
    <TextInput
    style={{width: 200, height: 40, borderColor:'gray', borderWidth: 1}}
    placeholder="Last name"
    onChangeText={(lastText) => this.setState({lastText})}
    value={this.state.lastText}
    />
    </View>
    <View style={styles.inputContainer}>
      <Button
      title = "Submit"
      color = "black"
      onPress={ () => {
        Alert.alert(this.state.monthText);
      } 
      }
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
  inputContainer: {
    margin: 10
  }

});
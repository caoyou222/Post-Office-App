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

 // function _saveData(){
 //  let month = this.state.monthText
 //  let day = this.state.day
 //  let year = this.state.year
 //  let trackingnum = this.state.track
 //  let carrier = this.state.carrier
 //  let first = this.state.first
 //  let last = this.state.last
 //  let sign = this.state.sign

 //  AsyncStorage.getItem('packages', (res) => {
 //    if (res === null) {
 //      packages = []
 //    }else {
 //      packages = Json 
 //    }
 //  })
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
    <View style={styles.buttonContainer}>
    <TextInput
    style={{width: 200, height: 40, borderColor:'gray', borderWidth: 1}}
    placeholder="Month"
    onChangeText={(monthText) => this.setState({monthText})}
    value={this.state.monthText}
    />
    </View>

    <View style={styles.buttonContainer}>
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

});
import React, { Component } from 'react';
import {TextInput, Image, Text, StyleSheet, View, Dimensions, Alert, Vibration, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Icon, Button, Divider, FormLabel, FormInput, FormValidationMessage, Input } from 'react-native-elements'

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
 signText: '',
 }; 
 }

 static navigationOptions = {
  title: 'Add packages',
  headerStyle: {backgroundColor: '#d69523'},
  headerTitleStyle: {color:'white', fontSize:20},
  headerBackTitleStyle: {color:'white'},
  headerTintColor: 'white'
 }

  //  addPackage() {
  //   var pack = {
  //     month = this.state.monthText
  //     day = this.state.dayText
  //     year = this.state.yearText
  //     trackingnum = this.state.trackText
  //     carrier = this.state.carrierText
  //     first = this.state.firstText
  //     last = this.state.lastText
  //     sign = this.state.signText
  //   };
  //   fetch('http://rns202-3.cs.stolaf.edu:28434/', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(pack)
  //   }).then((response) => response.json())
  //     .then((responseJson) => {
  //       return responseJson.Message;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  focusDayInput() {
    this.dayInput.focus();
  }


 render(){
 const { navigate } = this.props.navigation;
 const {monthText,dayText} = this.state;
 const { params } = this.props.navigation.state;
 return (

  <View style={styles.container}>

    <ScrollView style={styles.inputContainer}>
    <View style={styles.inputContainer}>
    <FormLabel>Month</FormLabel>
    <FormInput 
    refInput={input => {this.monthInput = input;}}
    onChangeText={(monthText) => this.setState({monthText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={this.focusDayInput.bind(this)}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Day</FormLabel>
    <FormInput 
    refInput={input => {this.dayInput = input;}}
    onChangeText={(dayText) => this.setState({dayText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={() => {
                  this.dayInput.focus()
                }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Year</FormLabel>
    <FormInput 
    onChangeText={(yearText) => this.setState({yearText})}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Traking number</FormLabel>
    <FormInput onChangeText={(trackText) => this.setState({trackText})}/>
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Carrier</FormLabel>
    <FormInput onChangeText={(carrierText) => this.setState({carrierText})}/>
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Last name</FormLabel>
    <FormInput onChangeText={(lastText) => this.setState({lastText})}/>
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>First name</FormLabel>
    <FormInput onChangeText={(firstText) => this.setState({firstText})}/>
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Signed/Unsigned</FormLabel>
    <FormInput  onChangeText={(signText) => this.setState({signText})}/>
    </View>

    <View style={styles.buttonContainer}>
      <Button
      rounded
      textStyle={{fontSize:22}}
      title = "Submit"
      color = 'white'
      backgroundColor = '#f2b243'
      onPress={ () => {
        this.addPackage();
        Alert.alert("Date: "+this.state.monthText+"/"+this.state.dayText+"/"+this.state.yearText+'\n'+"Traking num:"+this.state.trackText);
      } 
      }
      />
    </View>
    </ScrollView>

    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM', {user: params.user})}
      />
    </View>
  </View>

  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20,
    marginTop:35
  },
  inputContainer: {
    margin: 15,
    height: 40,
  },
  bottomContainer:{
    position:'absolute',
    height: 55,
    justifyContent:'center',
    bottom: 0,
    right: 0,
    left: 0
  },

});
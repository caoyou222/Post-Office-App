import React, { Component } from 'react';
import {KeyboardAvoidingView, LayoutAnimation,TextInput, Image, Text, StyleSheet, View, Dimensions, Alert, Vibration, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Icon, Button, Divider, FormLabel, FormInput, Form, FormValidationMessage, Input } from 'react-native-elements'

export default class addPack extends React.Component {
 constructor(props){
 super(props);

 this.state = {
 monthText: '',
 monthValid: true,
 dayText: '',
 yearText: '',
 trackText: '',
 carrierText: '',
 firstText: '',
 lastText: '',
 signText: '',
 behavior: 'padding',
 errorMessage:'This field is required',
 }; 
 }

 static navigationOptions = {
  title: 'Add packages',
  headerStyle: {backgroundColor: '#d69523'},
  headerTitleStyle: {color:'white', fontSize:20},
  headerBackTitleStyle: {color:'white'},
  headerTintColor: 'white'
 }

 validateMonth() {
    const { monthText } = this.state
    const monthValid = monthText.length > 0
    this.setState({ monthValid })
    monthValid || this.refs.monthInput.shake()
    alert(monthValid)
    return monthValid
  }



   addPackage() {
    var pack = {
      month: this.state.monthText,
      // day: this.state.dayText,
      // year: this.state.yearText,
      // trackingnum: this.state.trackText,
      // carrier: this.state.carrierText,
      // first: this.state.firstText,
      // last: this.state.lastText,
      // sign: this.state.signText,
    };
    
    fetch('http://rns202-3.cs.stolaf.edu:28434/packages', {
      method: 'POST',
      headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: JSON.stringify(pack)
    }).then((response) => response.json())
      .then((data) => {
        console.log('added')
        return responseJson.Message;
      })
      .catch((err) => {
        alert('error');
        console.log(error);
      });
  }

 render(){
 const { navigate } = this.props.navigation;
 const {month,monthValid,errorMessage} = this.state;
 return (

  <View style={styles.container}>
  <KeyboardAvoidingView behavior='padding' style={styles.container}>
    <ScrollView style={styles.inputContainer}>
    <View style={styles.inputContainer}>
    <FormLabel>Month</FormLabel>
    <FormInput 
    ref='monthInput'
    refInput={input => {this.monthInput = input;}}
    onChangeText={(monthText) => this.setState({monthText})}
    returnKeyType="next"
    keyboardType="numbers-and-punctuation"
    errorMessage='This field is required'
     onSubmitEditing={(event) => { 
     this.validateMonth();
     this.refs.dayInput.focus(); 
    }}
    />
    {!monthValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Day</FormLabel>
    <FormInput 
    ref='dayInput'
    // ref={input => {this.dayInput = input;}}
    onChangeText={(dayText) => this.setState({dayText})}
    returnKeyType="next"
    keyboardType="numbers-and-punctuation"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.yearInput.focus(); 
    }}
    />
    {!dayValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Year</FormLabel>
    <FormInput 
    ref='yearInput'
    onChangeText={(yearText) => this.setState({yearText})}
    returnKeyType="next"
    keyboardType="numbers-and-punctuation"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.trackInput.focus(); 
    }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Traking number</FormLabel>
    <FormInput 
    ref='trackInput'
    onChangeText={(trackText) => this.setState({trackText})}
    returnKeyType="next"
    keyboardType="name-phone-pad"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.carrierInput.focus(); 
    }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Carrier</FormLabel>
    <FormInput 
    ref='carrierInput'
    onChangeText={(carrierText) => this.setState({carrierText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.lnameInput.focus(); 
    }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Last name</FormLabel>
    <FormInput 
    ref='lnameInput'
    onChangeText={(lastText) => this.setState({lastText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.fnameInput.focus(); 
    }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>First name</FormLabel>
    <FormInput 
    ref='fnameInput'
    onChangeText={(firstText) => this.setState({firstText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.refs.signInput.focus(); 
    }}
    />
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Signed/Unsigned</FormLabel>
    <FormInput  
    ref='signInput'
    onChangeText={(signText) => this.setState({signText})}
    returnKeyType="next"
    errorMessage='This field is required'
    />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      rounded
      textStyle={{fontSize:22}}
      title = "Submit"
      color = 'white'
      backgroundColor = '#f2b243'

      />
    </View>
    </ScrollView>

    </KeyboardAvoidingView>

    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM')}
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
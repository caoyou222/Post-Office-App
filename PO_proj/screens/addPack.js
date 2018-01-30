import React, { Component } from 'react';
import {KeyboardAvoidingView, LayoutAnimation,TextInput, Image, Text, StyleSheet, View, Dimensions, Alert, Vibration, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Icon, Button, Divider, FormLabel, FormInput, Form, FormValidationMessage, Input } from 'react-native-elements'

const SERVER = 'http://rns202-5.cs.stolaf.edu:28425/'

export default class addPack extends React.Component {
 constructor(props){
 super(props);

 this.state = {
 monthText: '',
 monthValid: true,
 dayText: '',
 dayValid: true,
 yearText: '',
 yearValid: true,
 trackText: '',
 trackValid: true,
 carrierText: '',
 carrierValid: true,
 fnameText: '',
 fnameValid: true,
 lnameText: '',
 lnameValid: true,
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
    return monthValid
  }

  validateDay() {
    const { dayText } = this.state
    const dayValid = dayText.length > 0
    this.setState({ dayValid })
    dayValid || this.refs.dayInput.shake()
    return dayValid
  }

  validateYear() {
    const { yearText } = this.state
    const yearValid = yearText.length > 0
    this.setState({ yearValid })
    yearValid || this.refs.yearInput.shake()
    return yearValid
  }

  validateTrack() {
    const { trackText } = this.state
    const trackValid = trackText.length > 0
    this.setState({ trackValid })
    trackValid || this.refs.trackInput.shake()
    return trackValid
  }

  validateCarrier() {
    const { carrierText } = this.state
    const carrierValid = carrierText.length > 0
    this.setState({ carrierValid })
    carrierValid || this.refs.carrierInput.shake()
    return carrierValid
  }

  validateLname() {
    const { lnameText } = this.state
    const lnameValid = lnameText.length > 0
    this.setState({ lnameValid })
    lnameValid || this.refs.lnameInput.shake()
    return lnameValid
  }

  validateFname() {
    const { fnameText } = this.state
    const fnameValid = fnameText.length > 0
    this.setState({ fnameValid })
    fnameValid || this.refs.fnameInput.shake()
    return fnameValid
  }

  notification = async() =>{
    console.log("Start");
    let notifyExpo = (token) =>{
      console.log('start notifying token: ' + token);
      var data = {to: token.slice(1,token.length -1), title: 'PO St. Olaf', body: 'Your package arrived'};
      console.log (JSON.stringify(data) );
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'content-type': 'application/json',
          'accept': 'application/json',
          'accept-encoding':'gzip, deflate'
        })
      }).then((res) => {
                  if (res.ok) {
                    console.log("it worked!")
                  } else {
                    console.log("nope")
                  }
              })
    }
    let getToken = () => {
            fetch(SERVER + 'user/getToken/' + this.state.fnameText + '@' + this.state.lnameText, {
                  method: "GET"
                  })
            .then((res) => {
                  if (res.ok) {
                    console.log("The token is: " + JSON.stringify(res._bodyText));
                    notifyExpo(JSON.stringify(res._bodyText));
                  } else {
                  console.log("nope")
                  }
              })
        }
    getToken();
  }

   addPackage() {
    
    fetch(SERVER + 'addpackages', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: `packinfo=${this.state.monthText},${this.state.dayText},${this.state.yearText},${this.state.trackText},${this.state.carrierText},${this.state.lnameText},${this.state.fnameText},`,
    }).then((res) => {
      if (res.ok) {
        console.log("it worked!")
        Alert.alert("Added!");
      }else {
        console.log("nope")
      }
    })

  }

  _add(){
    this.notification();
    this.addPackage();
  }

 render(){
 const { navigate } = this.props.navigation;
 const {monthValid,
        dayValid,
        yearValid,
        trackValid,
        carrierValid,
        fnameValid,
        lnameValid,
        errorMessage} = this.state;
 const { params } = this.props.navigation.state;
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
     this.validateDay();
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
     this.validateYear();
     this.refs.trackInput.focus(); 
    }}
    />
    {!yearValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
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
     this.validateTrack();
     this.refs.carrierInput.focus(); 
    }}
    />
    {!trackValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Carrier</FormLabel>
    <FormInput 
    ref='carrierInput'
    onChangeText={(carrierText) => this.setState({carrierText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.validateCarrier();
     this.refs.lnameInput.focus(); 
    }}
    />
    {!carrierValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Last name</FormLabel>
    <FormInput 
    ref='lnameInput'
    onChangeText={(lnameText) => this.setState({lnameText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.validateLname();
     this.refs.fnameInput.focus(); 
    }}
    />
    {!lnameValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>First name</FormLabel>
    <FormInput 
    ref='fnameInput'
    onChangeText={(fnameText) => this.setState({fnameText})}
    returnKeyType="next"
    errorMessage='This field is required'
    onSubmitEditing={(event) => { 
     this.validateFname();
     this.refs.signInput.focus(); 
    }}
    />
    {!fnameValid &&
      <FormValidationMessage>
      {errorMessage}
      </FormValidationMessage>
    }
    </View>

    <View style={styles.inputContainer}>
    <FormLabel>Status/Unsigned</FormLabel>
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
      onPress={this._add.bind(this)}
      />
    </View>
    </ScrollView>

    </KeyboardAvoidingView>

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
    margin: 10,
    marginBottom: 30,
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
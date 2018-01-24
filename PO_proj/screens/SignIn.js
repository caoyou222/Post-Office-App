import React from 'react';
import {StackNavigator} from 'react-navigation'
import { StyleSheet, Text, TouchableOpacity, View, Button, Linking } from 'react-native';
import Expo from 'expo';
'use strict';
import { Component } from 'react';

var username = '';
export default class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.isLogin = false;
  }
  _signInWithGoogleAsync = async() => {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: '649523395351-ntal3qggm5q62rpge8d3plqil4kh8jvf.apps.googleusercontent.com',
        androidClientId: '649523395351-4pv762m8gltfovefec5o9pvi9p2rnvo1.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        console.log(result.type);
        this.isLogin = true;
        return result;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }
  _onPress = () => { 
    const {navigate} = this.props.navigation;
    this._signInWithGoogleAsync().then( (e) =>{
      if (this.isLogin === true){
        username = e.user.name;
        console.log( "Welcome " + username);
        navigate('HM');
      }
    })
    .catch( (e) => {
      console.log('Fail login '+ e);
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
          title="Sign in"
          color="green"
          onPress={ () =>{
            this._onPress();
          }}
          />
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});

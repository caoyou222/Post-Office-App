import React from 'react';
import {StackNavigator} from 'react-navigation'
import { StyleSheet, Text, TouchableOpacity, View, Linking, ImageBackground } from 'react-native';
import Expo from 'expo';
'use strict';
import { Component } from 'react';
import { Button } from 'react-native-elements';


var username = '';
export default class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.isLogin = false;
  }

  static navigationOptions = {
    header: null,
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
        navigate('HM', {user:username});
      }
    })
    .catch( (e) => {
      console.log('Fail login '+ e);
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
    <ImageBackground 
    source = {{uri: 'https://i0.wp.com/wp.stolaf.edu/wp-content/uploads/2017/10/Natural_Lands_Pak4-3.jpg?ssl=1'}}
    style = {styles.backgroundImage}
    opacity = {0.8}
    resizeMode='cover'>
      <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
          activeOpacity={0.4}
          textStyle={{fontSize:25, fontWeight:'bold'}}
          buttonStyle = {{alignSelf: 'center', width: 250,backgroundColor:'transparent',borderWidth: 3, borderColor: 'white', borderRadius: 30}}
          title="Sign in"
          color="white"
          overflow= 'hidden'
          iconRight={{name: 'login', type: 'entypo', color:'white',size:28}}
          onPress={ () =>{
            this._onPress();
          }}
          />
        </View>
      </View>
      </View>
      </ImageBackground>
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
    marginTop: 250,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    overflow: 'hidden'
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
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch'
  }
});

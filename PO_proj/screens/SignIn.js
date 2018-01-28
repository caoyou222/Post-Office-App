import React from 'react';
import {StackNavigator} from 'react-navigation'
import { StyleSheet, Text, TouchableOpacity, View, Linking, ImageBackground } from 'react-native';
import Expo, { Permissions, Notifications } from 'expo';
import { Component } from 'react';
import { Button } from 'react-native-elements';

const PUSH_ENDPOINT = 'http://rns202-5.cs.stolaf.edu:28425/users/push-token';

var user_name = '';
export default class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.isLogin = false;
  }

  static navigationOptions = {
    header: null
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
  _check(str){
    if ( str.length < 12) return false;
    if (str.slice(str.length-11, str.length) !== "@stolaf.edu") return false;
    return true;
  }
  _isWorker(email){
    const {navigate} = this.props.navigation;
    let str = 'http://rns202-5.cs.stolaf.edu:28425/user/' + email;
    console.log("Start fetching" + str);
    fetch(str)
    .then( (res) => {
      console.log("Finish");
          if (res.ok) {
            console.log("It worked!");
            if (JSON.stringify(res._bodyText ) === "\"1\"")
              navigate('ST', {user:user_name}); /* a worker */
            else navigate('ST', {user:user_name});
        }
      })
    .catch((error) => {
      console.error(error);
    })
  }
  _onPress = () => { 
    this._signInWithGoogleAsync().then( (e) =>{
      if (this.isLogin === true){
        let tmp = e.user.email;
        if (this._check(tmp) === false){
          console.log( "This account does not belonged to St. Olaf" );
        }
        else{
          user_name = e.user.name;
          tmp = e.user.email;
          console.log( "Welcome " + user_name);
          this._isWorker( tmp.slice(0, tmp.length - 11));
        }
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


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: user_name,
      },
    }),
  });
}
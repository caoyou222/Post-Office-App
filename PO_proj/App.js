import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibrationm, Platform, BackHandler} from 'react-native';
import {StackNavigator} from 'react-navigation'
import home from './screens/home'
import student from './screens/student';
import worker from './screens/worker';
<<<<<<< HEAD
import filter from './screens/filter';
import addPack from './screens/addPack';
=======
import Detail from './screens/Detail';
import SignIn from './screens/SignIn';
>>>>>>> 210d85ffce1c053b0e7d34c5ed5246084130ca43

const Navi = StackNavigator({
  SI: {screen: SignIn},
  HM: {screen: home},
  WK: {screen: worker},
  ST: {screen: student},
<<<<<<< HEAD
  FT: {screen: filter},
  AP: {screen: addPack},
=======
  DT: {screen: Detail, navigationOptions:({navigation,screenProps}) => ({headerTitle:'Package Detail',})},

>>>>>>> 210d85ffce1c053b0e7d34c5ed5246084130ca43
});


export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
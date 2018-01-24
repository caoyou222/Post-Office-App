import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibrationm, Platform, BackHandler} from 'react-native';
import {StackNavigator} from 'react-navigation'
import home from './screens/home'
import student from './screens/student';
import worker from './screens/worker';
import Detail from './screens/Detail';
import SignIn from './screens/SignIn';

const Navi = StackNavigator({
  SI: {screen: SignIn},
  HM: {screen: home},
  WK: {screen: worker},
  ST: {screen: student},
  DT: {screen: Detail, navigationOptions:({navigation,screenProps}) => ({headerTitle:'Package Detail',})},

});


export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
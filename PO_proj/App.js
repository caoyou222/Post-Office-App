import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibrationm, Platform, BackHandler} from 'react-native';
import {StackNavigator} from 'react-navigation'
import home from './screens/home'
import student from './screens/student';
import worker from './screens/worker';
import filter from './screens/filter';
import addPack from './screens/addPack';
import Detail from './screens/Detail';
import SignIn from './screens/SignIn';
import search from './screens/search';


const Navi = StackNavigator({
 
  
    HM: {screen: home},
    WK: {screen: worker},
  ST: {screen: student},
  search: {screen: search},
  SI: {screen: SignIn},

  
  ST: {screen: student},
  FT: {screen: filter},
  AP: {screen: addPack},
  DT: {screen: Detail, navigationOptions:({navigation,screenProps}) => ({headerTitle:'Package Detail',})},
  FT: {screen: filter},
  AP: {screen: addPack},
  DT: {screen: Detail}
});

export default class TestApp extends React.Component{

  render(){
    return <Navi/>;
  }
};
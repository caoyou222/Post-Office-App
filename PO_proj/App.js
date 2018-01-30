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
import NotFound from './screens/NotFound';
import Tracking from './screens/Tracking';
import home2 from './screens/home2';
import Signature from './screens/Signature';
import Detail2 from './screens/Detail2';
// import signCap from './screen/signCap';

const Navi = StackNavigator({ 

  SI: {screen: SignIn},
  FT: {screen: filter},
  SG: {screen: Signature},
  AP: {screen: addPack},
  HM: {screen: home},
  HM2: {screen: home2},
  FT: {screen: filter},  
  SG: {screen: Signature},
  WK: {screen: worker},
  ST: {screen: student},
  search: {screen: search}, 
  DT: {screen: Detail},
  DT2: {screen: Detail2},
  NotFound: {screen: NotFound},
  TK: {screen: Tracking}
})

export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
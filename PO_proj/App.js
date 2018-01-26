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
import Count from './screens/Count';

const Navi = StackNavigator({
  HM: {screen: home},
  CT: {screen: Count},
  SI: {screen: SignIn},
	AP: {screen: addPack},
  WK: {screen: worker},
  ST: {screen: student},
  search: {screen: search}, 
  FT: {screen: filter},
  DT: {screen: Detail},
  NotFound: {screen: NotFound},
  TK: {screen: Tracking}
})

export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
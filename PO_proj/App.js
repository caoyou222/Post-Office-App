import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibrationm, Platform, BackHandler} from 'react-native';
import {StackNavigator} from 'react-navigation'
import home from './screens/home'
import student from './screens/student';
import worker from './screens/worker';
import filter from './screens/filter';
import addPack from './screens/addPack';

const Navi = StackNavigator({
  HM: {screen: home},
  WK: {screen: worker},
  ST: {screen: student},
  FT: {screen: filter},
  AP: {screen: addPack},
});

export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
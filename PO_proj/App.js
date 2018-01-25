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
<<<<<<< HEAD
=======
import search from './screens/search';


>>>>>>> 73e04727673c2041fcf6556d5e560cd7c5503b52

const Navi = StackNavigator({
 
  ST: {screen: student},
  search: {screen: search},
  SI: {screen: SignIn},
  HM: {screen: home},
  WK: {screen: worker},
<<<<<<< HEAD
  ST: {screen: student},
  FT: {screen: filter},
  AP: {screen: addPack},
  DT: {screen: Detail, navigationOptions:({navigation,screenProps}) => ({headerTitle:'Package Detail',})},
});

=======
  FT: {screen: filter},
  AP: {screen: addPack},
  DT: {screen: Detail}
})
>>>>>>> 73e04727673c2041fcf6556d5e560cd7c5503b52

export default class TestApp extends React.Component{

  render(){
    return <Navi/>;
  }
};
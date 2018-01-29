import React, { Component } from 'react';
import {Header, Image, Text, StyleSheet, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar, CheckBox, List, ListItem, Icon, Button } from 'react-native-elements';

export default class worker extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }

 static navigationOptions = {
  title: 'Workers',
  headerStyle: {backgroundColor: '#d69523'},
  headerTitleStyle: {color:'white', fontSize:20},
  headerBackTitleStyle: {color:'white'},
  headerTintColor: 'white'
 }



// function getPackage() {
//   fetch('url', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then((response) => response.json())
//     .then((data) => {
//       let month = data.month;
//       let date = data.date;
//       let year = data.year;
//       alert("Date:" month+date+year);
//       // console.log(data)
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (

  <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <Button
      activeOpacity={0.4}
      icon={{name:'search', type:'FontAwesome', size:26}}
      textStyle={{fontSize:22, fontWeight:'bold'}}
      buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'#f2b243',borderWidth: 2, borderColor: '#f2b243', borderRadius: 30}}
      title = "Search Package"
      color = "white"
      onPress={()=> navigate('FT', {user: params.user})}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      activeOpacity={0.4}
      icon={{name:'add-circle-outline', type:'Ionicons', size:26}}
      textStyle={{fontSize:22, fontWeight:'bold'}}
      buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'#f2b243',borderWidth: 2, borderColor: '#f2b243', borderRadius: 30}}
      title = "Add Package"
      color = "white"
      onPress={()=> navigate('AP', {user: params.user})}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      activeOpacity={0.4}
      icon={{name:'add-circle-outline', type:'Ionicons', size:26}}
      textStyle={{fontSize:22, fontWeight:'bold'}}
      buttonStyle = {{alignSelf: 'center', width: 250, backgroundColor:'#f2b243',borderWidth: 2, borderColor: '#f2b243', borderRadius: 30}}
      title = "Signature"
      color = "white"
      onPress={()=> navigate('SG',{user: params.user})}
      />
    </View>


    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM', {user: params.user})}
      />
    </View>
 </View>
 );
}
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    margin: 20,
    backgroundColor:'transparent'
  },
  bottomContainer:{
    position:'absolute',
    height: 55,
    justifyContent:'center',
    bottom: 0,
    right: 0,
    left: 0
  },
});

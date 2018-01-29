import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation'
import {Card, ListItem} from 'react-native-elements'

const SERVER_PACKAGES = 'http://rns202-5.cs.stolaf.edu:28425/sign'
export default class Detail2 extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
    title: 'Package Detail',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
 }

  _update(){
    const { params } = this.props.navigation.state;
    return fetch(SERVER_PACKAGES, {
    method: "PATCH", body:`trackno=${params.trackno}` ,
    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"} })
    .then((res) => {
      if (res.ok) {
        console.log("it worked!");
      } else {
        console.log("nope")
      }
    })

  }

  _mark(){
    this._update();
    //console.log(keywords);
    //this._onRefresh();
  }

 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (
  <Card title = {params.trackno}>
   <Text style={{height: 20, fontWeight: 'bold', color: '#514e48'}}>Name:                            {params.name}</Text>
   <Text style={{height: 20, fontWeight: 'bold',color: '#514e48'}}>Carrier                           {params.carrier}</Text>
   <Text style={{height: 20, fontWeight: 'bold',color: '#514e48'}}>Status:                           {params.status}</Text>
   <Text style={{height: 20, fontWeight: 'bold',color: '#514e48'}}>Date:                              {params.month}/{params.day}/{params.year}</Text>
   <TouchableOpacity style={styles.buttonContainer} onPress = {this._mark.bind(this)}>
        <Text style={{color: 'grey', marginLeft: 6, fontSize: 15, fontWeight: 'bold'}}> Mark as Signed </Text>
   </TouchableOpacity>
  </Card>
 
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    margin: 20
  },

});

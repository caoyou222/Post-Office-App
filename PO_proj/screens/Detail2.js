import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Vibration, TouchableOpacity, TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation'
import {Card, ListItem, FormInput ,Button} from 'react-native-elements'

const SERVER = 'http://rns202-5.cs.stolaf.edu:28425/'
const SERVER_PACKAGES = SERVER + 'signpack'

export default class Detail2 extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow',
 signText: '',
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
   <View style={styles.inputContainer}>
        <FormInput 
          ref='signInput'
          placeholder = "Sign Here"
          refInput={input => {this.signInput = input;}}
          onChangeText={(signText) => this.setState({signText})}
        />
        <View style={styles.buttonContainer}>
        <Button
          small
          iconRight={{name:'checkbox-marked-circle-outline', type:'material-community', size:26}}
          textStyle={{fontSize:20}}
          title = "Sign"
          color = 'white'
          backgroundColor = '#f2b243'
          onPress = {this._mark.bind(this)}
        />
        </View>
   </View>
  </Card>
 
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10
  },
  inputContainer: {
    marginTop: 40,
    margin: 10,
  },

});

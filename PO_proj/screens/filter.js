import React, { Component } from 'react';
import {ScrollView, TextInput, Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar, CheckBox, Icon } from 'react-native-elements';

export default class filter extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
 title: 'Search Packages',
 headerStyle: {backgroundColor: '#d69523'},
 headerTitleStyle: {color:'white', fontSize:20},
 headerBackTitleStyle: {color:'white'},
 headerTintColor: 'white'
 }

 render(){
 const { navigate } = this.props.navigation;
 state = {
 	ups:false,
 	usps:false,
 	fedex:false,
 	dhl:false,
 	today:false,
 	week:false,
 	month:false,
 	tmonth:false,
 	sign:false,
 	unsign:false,
 };
 return (
  <View style={styles.container}>
  	<View style={styles.searchbar}>
	<SearchBar containerStyle={{width: 270, backgroundColor: 'white'}}
    inputStyle = {{backgroundColor: 'white'}}
    lightTheme
    placeholderTextColor = '#eae0cd'
    // onChangeText={this._changeText.bind(this)}
    // onClearText={someMethod}
    icon={{ type: 'font-awesome', name: 'search' , color: '#d69523'}}

    placeholder='Enter tracking number or status to search' />
    <Button small
      title='Search'
      buttonStyle={{backgroundColor: '#eae0cd'}}
      color = "grey"

      />
      </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Carrier"
      color = "black"
      onPress={()=> navigate('WK')}
      />
      <ScrollView style={styles.checkContainer}>
      <CheckBox
		  title='UPS'
		  checked={this.state.ups}
		  onPress={(checked)=> this.setState({
		  	ups: !this.state.ups,
		  })}
		/>
		<CheckBox
		  title='USPS'
		  checked={this.state.usps}
		  onPress={(checked)=> this.setState({
		  	usps: !this.state.usps,
		  })}
		/>
		<CheckBox
		  title='Fedex'
		  checked={this.state.fedex}
		  onPress={(checked)=> this.setState({
		  	fedex: !this.state.fedex,
		  })}
		/>
		<CheckBox
		  title='DHl'
		  checked={this.state.dhl}
		  onPress={(checked)=> this.setState({
		  	dhl: !this.state.dhl,
		  })}
		/>
	  </ScrollView>
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Date"
      color = "black"
      onPress={()=> navigate('WK')}
      />
      <ScrollView style={styles.checkContainer}>
      <CheckBox
		  title='Today'
		  checked={this.state.today}
		  onPress={(checked)=> this.setState({
		  	today: !this.state.today,
		  })}
		/>
		<CheckBox
		  title='Last week'
		  checked={this.state.week}
		  onPress={(checked)=> this.setState({
		  	week: !this.state.week,
		  })}
		/>
		<CheckBox
		  title='Last month'
		  checked={this.state.month}
		  onPress={(checked)=> this.setState({
		  	month: !this.state.month,
		  })}
		/>
		<CheckBox
		  title='Last 3 month'
		  checked={this.state.tmonth}
		  onPress={(checked)=> this.setState({
		  	tmonth: !this.state.tmonth,
		  })}
		/>
	  </ScrollView>
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Filter By Status"
      color = "black"
      onPress={()=> navigate('WK')}
      />
      <ScrollView style={styles.checkContainer}>
      <CheckBox
		  title='Signed'
		  checked={this.state.sign}
		  onPress={(checked)=> this.setState({
		  	sign: !this.state.sign,
		  })}
		/>
		<CheckBox
		  title='Unsigned'
		  checked={this.state.unsign}
		  onPress={(checked)=> this.setState({
		  	unsign: !this.state.unsign,
		  })}
		/>
	  </ScrollView>
    </View>

    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM')}
      />
    </View>

  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  searchbar: {
    flexDirection: 'row',
    paddingRight: 10,
    backgroundColor: '#eae0cd',
    alignItems:'center',
  },
  buttonContainer: {
    margin: 10,
  },
  checkContainer: {
  	height: 150
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
import React, { Component } from 'react';
import {Header, Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation';


export default class worker extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 backgroundColor: 'yellow'
 }; 
 }
 static navigationOptions = {
  title: 'Workers',
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
 return (

  <View style={styles.container}>

    <View style={styles.buttonContainer}>
      <Button
      title = "Search Package"
      color = "black"
      onPress={()=> navigate('FT')}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button
      title = "Add Package"
      color = "black"
      onPress={()=> navigate('AP')}
      />
    </View>
 </View>
 );
}
} 
    // <View style={styles.buttonContainer}>
    //   <Button
    //   title = "Home"
    //   color = "black"
    //   onPress={()=> navigate('HM')}
    //   />
    // </View>


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20
  },

});

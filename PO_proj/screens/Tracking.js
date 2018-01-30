import React from 'react';
import {StackNavigator} from 'react-navigation'
import { StyleSheet, Text, View, Vibration, Linking, TextInput } from 'react-native';
import Expo, {Audio, Constants, WebBrowser } from 'expo';
import {SearchBar, Button} from 'react-native-elements'

export default class Tracking extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
        this.id = "";
    }

    
    _tracking(){
        tmp = "http://www.google.com/search?q=" + this.state.input;
        WebBrowser.openBrowserAsync(tmp);
    }
    

    static navigationOptions = {
    title: 'Tracking Page',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
 }
    
    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.container}>
                <View style={styles.header}>
                <SearchBar containerStyle={{width: 350, height: 80, backgroundColor: 'white'}}
            inputStyle = {{backgroundColor: 'white'}}
            lightTheme
            placeholderTextColor = '#eae0cd'
            onChangeText={(text) => this.setState({input: text})}
                 placeholder='Enter tracking number to search' />
                
                </View>

                <View style={styles.buttonContainer}>
                <Button
                title="Track"
                textStyle ={{fontWeight: '500'}}
                buttonStyle={{backgroundColor: '#eae0cd', width: 200, height: 45, borderRadius: 30}}
                color='grey'
                onPress={() => {this._tracking()}}
                />
                </View>
                
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginTop:60
},
    header: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
    buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems:'center',
 },
 });

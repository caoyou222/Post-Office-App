import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, AppRegistry, Image, ListView, SectionList, Text, StyleSheet, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'
// import SearchInput, {createFilter} from 'react-native-search-filter';
import SearchInput, {createFilter} from 'react-native-search-filter';
import { SearchBar, Button, Icon} from 'react-native-elements';


let sourceData = [
    {trackno: '0000000000', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1399674572', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '2222222222', carrier: 'UPS', name:'Vo', year:'2018', month: '1', day:'15', status: 'Signed'},
    {trackno: '1399674570', carrier: 'DHL', name:'Rab', year:'2018', month: '1', day:'24', status: 'Signed'},
    {trackno: '4444444444', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '5555555555', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1Z11Y9790211025413', carrier: 'UPS', name:'Annie', year:'2017', month: '12', day:'12', status: 'Signed'},
    {trackno: '7777777777', carrier: 'DHL', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '9999999999', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Signed'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'Unsigned'},
]
let keywords = ''

export default class student extends Component {
  static navigationOptions = {
    title: 'Packages',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'},
<<<<<<< HEAD
    headerBackTitleStyle: {color:'white'}
=======
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
>>>>>>> 55738c70b41e0ad32e6948e32a2ebf159113f4ef
 }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                getRowData: (data, sectionID, rowID) => {
                        return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                }
            }),

            sourceData: undefined,
            keywords: '',
        }
    }

    _changeText(val){
      keywords = val;
      //console.log(keywords);
    }

    _search(){
      //comment
      console.log(keywords);
      const { navigate } = this.props.navigation;
      cr = [];
      cr = sourceData.filter(function(sd){return sd.carrier === keywords;});
      tn = [];
      tn = sourceData.filter(function(sd){return sd.trackno === keywords;});
      st = [];
      st = sourceData.filter(function(sd){return sd.status === keywords;});
      if(cr.length === 0 && tn.length === 0 && st.length === 0){
        navigate('NotFound');
      }
      if(cr.length !== 0){
        console.log(cr);
        navigate('search', {key: keywords, pkg: cr});
      }
      if(tn.length !== 0){
        console.log(tn);
        navigate('DT', {key: keywords, trackno: tn[0].trackno, carrier: tn[0].carrier, name: tn[0].name, year: tn[0].year, month: tn[0].month, day: tn[0].day, status: tn[0].status});
      }
      if(st.length !== 0){
        console.log(st);
        navigate('search', {key: keywords, pkg: st});
      }

    }

render(){
const { navigate } = this.props.navigation;
return (
 <View style={styles.container}>
  <View style={styles.header}>
    <SearchBar containerStyle={{width: 270, backgroundColor: 'white'}}
    inputStyle = {{backgroundColor: 'white'}}
    lightTheme
    placeholderTextColor = '#eae0cd'
    onChangeText={this._changeText.bind(this)}
    // onClearText={someMethod}
    icon={{ type: 'font-awesome', name: 'search' , color: '#d69523'}}

    placeholder='Enter tracking number or status to search' />
    <Button small
      title='Search'
      buttonStyle={{backgroundColor: '#eae0cd'}}
      color = "grey"
      onPress={this._search.bind(this)}
      />
      </View>

   <ListView 
     dataSource = {this.state.dataSource.cloneWithRows(sourceData)}
     renderRow={(rowData, sectionID, rowId)=>{return(
        <TouchableOpacity
              onPress={()=>navigate('DT', {trackno: rowData.trackno, carrier: rowData.carrier, name: rowData.name, year: rowData.year, month: rowData.month, day: rowData.day, status: rowData.status})}
            >
            <View style={styles.sectionHeader}>
                <Text>{rowData.trackno}</Text>
            </View>
            </TouchableOpacity>
        );}
    }
    />

    <View style={styles.bottom}>
    <Icon large
      name='home'
      color = '#d69523'
      onPress={()=>navigate('HM')}
      />
      </View>

 </View>
 );
}
} 


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingRight: 10,
    backgroundColor: '#eae0cd',
    alignItems:'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  bottom:{
    height: 52,
    backgroundColor: 'white',
    alignItems: 'center'
  },

  buttonContainer: {
    margin: 10,
    resizeMode: 'stretch',
  },

  sectionHeader: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#d9d9d9'
  },

});


AppRegistry.registerComponent('student', () => student);

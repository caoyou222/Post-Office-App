import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, AppRegistry, Image, ListView, SectionList, Text, StyleSheet, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'
import SearchInput, {createFilter} from 'react-native-search-filter';
import { SearchBar, Button} from 'react-native-elements';

let sourceData = [
    {trackno: '0000000000', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '1399674572', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '2222222222', carrier: 'UPS', name:'Vo', year:'2018', month: '1', day:'15', status: 'signed'},
    {trackno: '1399674570', carrier: 'DHL', name:'Rab', year:'2018', month: '1', day:'24', status: 'signed'},
    {trackno: '4444444444', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '5555555555', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '1Z11Y9790211025413', carrier: 'UPS', name:'Annie', year:'2017', month: '12', day:'12', status: 'signed'},
    {trackno: '7777777777', carrier: 'DHL', name:'Alina', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '9999999999', carrier: 'DHL', name:'Annie', year:'2018', month: '1', day:'24', status: 'unsigned'},
    {trackno: '1Z9E61W60389597736', carrier: 'UPS', name:'Alina', year:'2018', month: '1', day:'24', status: 'unsigned'},
]
let keywords = ''

export default class student extends Component {
  static navigationOptions = {
    title: 'Student Page',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'}
 }

    constructor(props) {
        super(props);
        
        this._renderSectionHeader = this._renderSectionHeader.bind(this);
        this._renderPackageRow = this._renderPackageRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
                getRowData: (data, sectionID, rowID) => {
                    if (data[sectionID][0].hide) {
                        return undefined;
                    } else {
                        return data[sectionID][rowID];
                    }
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                }
            }),

            sourceData: undefined,
        }
    }

    componentDidMount() {
        this._configSourceData(sourceData);
    }

    _renderPackageRow(pack, sectionID, rowID) {
        const {navigate} = this.props.navigation;
        if (pack === undefined || (rowID == 0 && !pack.hide)) {
            return null;
        }
        if(pack !== undefined){
          return (
             <TouchableOpacity
              onPress={()=>navigate('DT', {trackno: pack.trackno, carrier: pack.carrier, name: pack.name, year: pack.year, month: pack.month, day: pack.day, status: pack.status})}
            >
            <View style={styles.sectionHeader}>
                <Text>{pack.trackno}</Text>
            </View>
            </TouchableOpacity>
        );
        }
        
    }

    _renderSectionHeader(pack, sectionID) {

        return (
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={()=>{
                    let newSourceData = this.state.sourceData;

                    for (let packageCarrier in this.state.sourceData) {
                        if (packageCarrier === sectionID) {
                            newSourceData[sectionID][0].hide = !newSourceData[sectionID][0].hide;
                        }
                    }

                    this.setState({sourceData: newSourceData});
                }}
            >
                <Text style={{color: 'black'}}>{sectionID}</Text>
            </TouchableOpacity>
        )
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
        navigate('search', {pkg: cr});
      }
      if(tn.length !== 0){
        console.log(tn);
        navigate('DT', {trackno: tn[0].trackno, carrier: tn[0].carrier, name: tn[0].name, year: tn[0].year, month: tn[0].month, day: tn[0].day, status: tn[0].status});
      }
      if(st.length !== 0){
        console.log(st);
        navigate('search', {pkg: st});
      }
      

    }

    _configSourceData(packages) {
        let sourceData = {};
        for (let pack of packages) {
            if (sourceData[pack.carrier]) {
                sourceData[pack.carrier].push(pack);
            } else {
                sourceData[pack.carrier] = [{hide: false}];
            }
        }

        this.setState({
            sourceData: sourceData
        });
    }

render(){
const { navigate } = this.props.navigation;
let packagesData = this.state.sourceData;
let sectionIDs = [];
let rowIDs = [];
for (let sectionID in packagesData) {
  sectionIDs.push(sectionID);

  let row = [];
  packagesData[sectionID].map((pack, index) => {
    row.push(index);
  })

  rowIDs.push(row);
}
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
     dataSource={this.state.dataSource.cloneWithRowsAndSections(packagesData, sectionIDs, rowIDs)}
     renderRow={this._renderPackageRow}
     renderSectionHeader={this._renderSectionHeader}
      >

    </ListView>

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

import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, AppRegistry, Image, ListView, SectionList, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'
import SearchInput, {createFilter} from 'react-native-search-filter';
import { SearchBar, CheckBox } from 'react-native-elements';

let sourceData = [{trackno: '', carrier: 'DHL', name:'', year:'', month: '', day:'', status: ''}]
export default class search extends Component {
  
  static navigationOptions = {
    title: 'Search Result',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'}
 }

    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        //sourceData.push({trackno: params.trackno, carrier: params.carrier, name: params.name, day: params.day, year: params.year, month: params.month, status: params.status});
        sourceData = params.pkg;
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
            keywords: '',
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
    
   <ListView 
     dataSource={this.state.dataSource.cloneWithRowsAndSections(packagesData, sectionIDs, rowIDs)}
     renderRow={this._renderPackageRow}
     renderSectionHeader={this._renderSectionHeader}
      >

    </ListView>

  <View style = {styles.bottom}>
          <Button style={styles.buttonContainer}
          title = "Home"
          color = "black"
          onPress={()=> navigate('HM')}
          />
        </View>
 </View>
 );
}
} 


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: Platform.OS === 'ios' ? 68:48,
    backgroundColor: '#d69523',
    alignItems:'center'
  },

  searchBar: {
    height: 5,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#d69523',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 12

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
    resizeMode: 'stretch'
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

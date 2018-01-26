import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, AppRegistry, Image, ListView, SectionList, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'
import SearchInput, {createFilter} from 'react-native-search-filter';
import { SearchBar, CheckBox, List, ListItem, Icon, Card } from 'react-native-elements';

let sourceData = [{trackno: '', carrier: 'DHL', name:'', year:'', month: '', day:'', status: ''}]
export default class search extends Component {
  
  static navigationOptions = {
    title: 'Search Result',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
 }

    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        sourceData = params.pkg;
        key = params.key;
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

render(){
const { navigate } = this.props.navigation;
return (
 <View style={styles.container}>
  <Card>
    <Text> {key} </Text>
  </Card>
   <ListView 
     dataSource = {this.state.dataSource.cloneWithRows(sourceData)}
     renderRow={(rowData, sectionID, rowId)=>{return(
            <View style={styles.sectionHeader}>
                <Text>{rowData.trackno}</Text>
            </View>
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

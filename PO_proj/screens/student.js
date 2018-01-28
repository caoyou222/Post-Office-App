import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, RefreshControl,AppRegistry, Image, ListView, SectionList, Text, StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';
import {StackNavigator} from 'react-navigation'
import { SearchBar, Button, Icon} from 'react-native-elements';

const SERVER_PACKAGES = 'http://rns202-5.cs.stolaf.edu:28425/packages'
let keywords = ''

export default class student extends Component {
  static navigationOptions = {
    title: 'Packages',
    headerStyle: {backgroundColor: '#d69523'},
    headerTitleStyle: {color:'white', fontSize:20},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
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
            isLoading: true,
            sourceData: undefined,
            refreshing: false,
        }
    }

    _changeText(val){
      keywords = val;
      //console.log(keywords);
    }


    componentDidMount=()=> {
    return fetch(SERVER_PACKAGES)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          sourceData: data.packages,
        }, function() {
          const { params } = this.props.navigation.state;
          list = [];
          list = this.state.sourceData.filter(function(sd){return sd.name === params.user;});
          console.log(list);
          list.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
          this.setState({sourceData: list});
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

    _onRefresh(){
      this.setState({refreshing: true});
      return fetch(SERVER_PACKAGES)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          refreshing:false,
          sourceData: data.packages,

        }, function() {
          const { params } = this.props.navigation.state;
          list = [];
          list = this.state.sourceData.filter(function(sd){return sd.name === params.user;});
          console.log(list);
          list.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
          this.setState({sourceData: list});
        });
      })
      .catch((error) => {
        console.error(error);
      });

    }

    _search(){
      //comment
      console.log(keywords);
      const { navigate } = this.props.navigation;
      cr = [];
      cr = this.state.sourceData.filter(function(sd){return sd.carrier === keywords;});
      tn = [];
      tn = this.state.sourceData.filter(function(sd){return sd.trackno === keywords;});
      st = [];
      st = this.state.sourceData.filter(function(sd){return sd.status === keywords;});
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

render=()=>{
const { navigate } = this.props.navigation;
const { params } = this.props.navigation.state;
//console.log(params.user);
if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
}

console.log(this.state.sourceData);
return (
 <View style={styles.container}>
  <View style={styles.header}>
    <SearchBar containerStyle={{width: Dimensions.get('window').width, backgroundColor: 'white'}}
    inputStyle = {{backgroundColor: 'white'}}
    lightTheme
    placeholderTextColor = '#eae0cd'
    onChangeText={this._changeText.bind(this)}
    returnKeyType="search"
    onSubmitEditing={this._search.bind(this)}
    icon={{ type: 'font-awesome', name: 'search' , color: '#d69523'}}

    placeholder='Enter tracking number or status to search' />
   
      </View>

   <ListView 
    refreshControl={
      <RefreshControl
        refreshing = {this.state.refreshing}
        onRefresh = {this._onRefresh.bind(this)} 
        />
    }
     dataSource = {this.state.dataSource.cloneWithRows(this.state.sourceData)}
     renderRow={(rowData, sectionID, rowId)=>{return(
        <TouchableOpacity
              onPress={()=>navigate('DT', {trackno: rowData.trackno, carrier: rowData.carrier, name: rowData.name, year: rowData.year, month: rowData.month, day: rowData.day, status: rowData.status})}
            >
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 16}}>{rowData.trackno}</Text>
                <Text style={{color: '#7e7e7e'}}>{rowData.month}/{rowData.day}/{rowData.year}</Text>
            </View>
            </TouchableOpacity>
        );}
    }
    />

    <View style={styles.bottom}>
    <Icon
      size={35}
      name='home'
      color = '#d69523'
      onPress={()=>navigate('HM2',{user: params.user})}
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
    backgroundColor: 'white',
    alignItems:'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  bottom:{
    height: 55,
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

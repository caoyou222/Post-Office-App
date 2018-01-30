
import React, { Component } from 'react';
import {Keyboard, TouchableOpacity, Platform, RefreshControl,AppRegistry, Image, ListView, SectionList, Text, StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';
import {StackNavigator} from 'react-navigation'
import { SearchBar, Button, Icon} from 'react-native-elements';

const SERVER_PACKAGES = 'http://rns202-3.cs.stolaf.edu:28434/signature'
let keywords = ''

export default class Signature extends Component {
  static navigationOptions = {
    title: 'Signature',
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

  componentDidMount=()=> {
    return fetch(SERVER_PACKAGES)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          sourceData: data.packages,
        }, function() {
          list = [];
          list = this.state.sourceData;
          console.log(list);
          list.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
          this.setState({sourceData: list});
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

    _changeText(val){
      keywords = val;
      //console.log(keywords);
    }

    _search(){
      const { navigate } = this.props.navigation;
      return fetch(SERVER_PACKAGES)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          sourceData: data.packages,

        }, function() {
          //const { params } = this.props.navigation.state;
          list = [];
          list = this.state.sourceData.filter(function(sd){return sd.name === keywords;});
          lastl = [];
          lastl = this.state.sourceData.filter(function(sd){return sd.last === keywords;});
          if(list.length !== 0) {
            list.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
            this.setState({sourceData: list});
          }
          if(lastl.length !== 0) {
            lastl.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
            this.setState({sourceData: lastl});
          }
          if(keywords === ''){
            list = this.state.sourceData.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
            this.setState({sourceData: list});
          }
          if(list.length === 0 && lastl.length === 0 && keywords !== ''){navigate('NotFound');}
                    
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
          list = [];
          if(keywords === '') list = this.state.sourceData;
          else list = this.state.sourceData.filter(function(sd){return sd.name === keywords;});
          console.log(list);
          list.sort(function(a,b){return parseInt(b.year.concat(b.month, b.day)) - parseInt(a.year.concat(a.month, a.day));});
          this.setState({sourceData: list});
        });
      })
      .catch((error) => {
        console.error(error);
      });

    }

  _update(){
    return fetch(SERVER_PACKAGES, {
    method: "PATCH", body:`name=${keywords}` ,
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
    console.log(keywords);
    this._onRefresh();
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
    <SearchBar containerStyle={{width: 230, backgroundColor: 'white'}}
    inputStyle = {{backgroundColor: 'white'}}
    lightTheme
    placeholderTextColor = '#eae0cd'
    onChangeText={this._changeText.bind(this)}
    returnKeyType="search"
    onSubmitEditing={this._search.bind(this)}
    icon={{ type: 'font-awesome', name: 'search' , color: '#d69523'}}

    placeholder='Enter tracking number or status to search' />

    <TouchableOpacity style={styles.buttonContainer} onPress = {this._mark.bind(this)}>
        <Icon name="check-all" type="material-community" color='grey' size={20} />
        <Text style={{color: 'grey', marginLeft: 6, fontSize: 16, fontWeight: 'bold'}}> Signed All </Text>
   </TouchableOpacity>
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
              onPress={()=>navigate('DT2', {trackno: rowData.trackno, carrier: rowData.carrier, name: rowData.name, year: rowData.year, month: rowData.month, day: rowData.day, status: rowData.status})}
            >
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 16}}>{rowData.trackno}</Text>
                <Text style={{color: '#7e7e7e'}}>{rowData.status}</Text>
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
      onPress={()=>navigate('HM', {user: params.user})}
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
    height: 55,
    backgroundColor: 'white',
    alignItems: 'center'
  },

  buttonContainer: {
    width: 100,
    marginLeft: 20,
    alignItems:'center',
    flexDirection:'row'
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

import React, { Component } from 'react';
import {ScrollView, ListView, TextInput, Image, Text, StyleSheet, Button, View, Dimensions, Vibration, DatePickerIOS} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { SearchBar, CheckBox, Icon } from 'react-native-elements';

let keywords = ''

export default class filter extends React.Component {
 constructor(props){
 super(props);
 this.state = {
            chosenDate: new Date(),
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
        }
  this.setDate = this.setDate.bind(this);
 }
 static navigationOptions = {
 title: 'Search Packages',
 headerStyle: {backgroundColor: '#d69523'},
 headerTitleStyle: {color:'white', fontSize:20},
 headerBackTitleStyle: {color:'white'},
 headerTintColor: 'white'
 }

_changeText(val){
      keywords = val;
    }

_search(){
  fetch('http://rns202-3.cs.stolaf.edu:28434/packages')
  .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          sourceData: data.packages,
        }, function() {
          //comment
          const { navigate } = this.props.navigation;
          tn = [];
          tn = this.state.sourceData.filter(function(pack){return pack.trackno === keywords;});

          cr = [];
          if(this.state.ups === true){
            cr = this.state.sourceData.filter(function(pack){return pack.carrier === "UPS";})
          }else if(this.state.usps === true){
            cr = this.state.sourceData.filter(function(pack){return pack.carrier === "USPS";})
          }else if(this.state.fedex === true){
            cr = this.state.sourceData.filter(function(pack){return pack.carrier === "FEDEX";})
          }else if(this.state.dhl === true){
            cr = this.state.sourceData.filter(function(pack){return pack.carrier === "DHL";})
          }

          // dt = [];
          // dt = tn.filter(function(pack){return pack.date === this.chosenDate;})
          
          // st = [];
          // if(this.status.signed === true){
          //   st = cr.filter(function(sd){return sd.status === "signed";});
          // }

          // if(tn.length === 0 && cr.length === 0 && st.length === 0){
          //   navigate('NotFound');
          // }
          if(cr.length !== 0){
            console.log(cr);
            navigate('TS', {key: keywords, pkg: cr});
          }
          if(tn.length !== 0){
            console.log(tn);
            navigate('DT', {key: keywords, trackno: tn[0].trackno, carrier: tn[0].carrier, name: tn[0].name, year: tn[0].year, month: tn[0].month, day: tn[0].day, status: tn[0].status});
          }
          // if(st.length !== 0){
          //   console.log(st);
          //   navigate('TS', {key: keywords, pkg: st});
          // }

          this.setState({sourceData: tn});
        });
      });
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
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }


 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
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
    onChangeText={this._changeText.bind(this)}
    // onClearText={someMethod}
    icon={{ type: 'font-awesome', name: 'search' , color: '#d69523'}}

    placeholder='Enter tracking number or status to search' />
    <Button small
      title='Search'
      buttonStyle={{backgroundColor: '#eae0cd'}}
      onPress={this._search.bind(this)}
      color = "grey"
      />
      </View>

    <ScrollView style={styles.buttonContainer}>

    <View style={styles.buttonContainer}>
      <Text style={{color: "black", fontSize:20}}>
      Filter by Date
      </Text>
      <ScrollView style={styles.checkContainer}>
      <DatePickerIOS
        date={this.state.chosenDate}
        mode="date"
        onDateChange={this.setDate}
      />
      </ScrollView>
    </View>

    <View style={styles.buttonContainer}>
      <Text style={{color: "black", fontSize:20}}>
      Filter by Carrier
      </Text>
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
      <Text style={{color: "black", fontSize:20}}>
      Filter by Status
      </Text>
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
    </ScrollView>

    <View style={styles.bottomContainer}>
      <Icon 
      size = {35}
      name = 'home'
      color = '#D69523'
      onPress={()=>navigate('HM', {user: params.user})}
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
    height:200,
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
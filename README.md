# Team POST OFFICE APP
### You Cao, Muchen Ge, Thong Vo

## Overview
Our project is developed for the Post Office in St. Olaf. Now, the Post Office write all the package informations manually. Each carrier has a notebook,
Student needs to sign each row for packages. Our app is aimed to create a management system for both PO workers and students.
Workers could add packages and change the status(signed/unsigned) for students and students have the ability to check their own packages and receive notifications when package has arrived.

## Quick Start
You need to setup by installing postgresql first,
After that: To add database: psql -U <username> <databasename> > po.psql

## Setting Up
For developers, please do following commands:
npm install react-native-elements --save
npm install react-native-navigation --save
npm install expo --save
npm install react-native-router-flux --save
npm install react-native-slide-view --save

For back-end developers:
Compile and running Backend.java along with the ExampleRestApiModel.java
Change the server address to where you run the server. In our case, the address is http://rns202-5.cs.stolaf.edu/28425/

## Structure and functions
### student page and Detail page, NotFound page
    Functions:
    Views: Has a searching bar and hit search on keyboard to search
    Clicking on list item to go to detail page to see all the detail information
    componentDidMount: when open the page, app will fetch from the server to get package data belongs to the user
    _onRefresh: refresh the page to fetch data
    search: searching by carrier, tracking number or status from already fetched data.
            searching by carrier and status returns a list view, tracking number returns a detail view for the specifc package
            Jump to the Not Found page if entering invalid info
    
    Corresponding backend models:
    PackageHandler: doGet function to retrieve data from the database
            
### Signature page and Detail2 page
    Functions:
    componentDidMount: get data when open page, list is ordered by date, showing status on side
    _search: searching by full name or last name, fetch data from backend server. Data shown by date
    _onRefresh: refresh the page to fetch data. When search bar is empty, fetch all data from the backend.
            When there's something in the search bar, just refresh the data for corresponding items
    _sign: 
    _slide:
    _update
    _mark
    
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
For developers, please do following commands: <br />
npm install react-native-elements --save <br />
npm install react-native-navigation --save <br />
npm install expo --save <br />
npm install react-native-router-flux --save <br />
npm install react-native-slide-view --save <br />

For back-end developers: <br />
Compile and running Backend.java along with the ExampleRestApiModel.java <br />
Change the server address to where you run the server. In our case, the address is http://rns202-5.cs.stolaf.edu/28425/ <br />

## Technologies
We use react-native and expo for the app development and use Rest Api to do the backend server.

## Structure and functions
### Home and Home2 page
    Home: for worker use, has both student page and worker page
    Home2: for student user, only has the student page
    Functionality:   
    Both pages get user information from sign in page, to show Welcome, {user_name}. Also has the sign out feature to go back.
### student page and Detail page, NotFound page
    Views: Has a searching bar and hit search on keyboard to search
    Functions:
    Clicking on list item to go to detail page to see all the detail information
    componentDidMount: when open the page, app will fetch from the server to get package data belongs to the user
    _onRefresh: refresh the page to fetch data
    search: searching by carrier, tracking number or status from already fetched data, ordered data by date, send the list to search page
            searching by carrier and status returns a list view, tracking number returns a detail view for the specifc package
            Jump to the Not Found page if entering invalid info
    
    Corresponding backend models:
    PackageHandler: doGet function to retrieve data from the database
            
### Signature page
    Views: Listview with click to jump to detail2 page. Also when retrieving data, shows the activity indicator. Has pull down to call refresh.
            Also implemented the slide to right to mark a single package
    Functions:
    componentDidMount: get data when open page, list is ordered by date, showing status on side
    _search: searching by full name or last name, fetch data from backend server. Ordered data by date, send the list to search page
    _onRefresh: refresh the page to fetch data. When search bar is empty, fetch all data from the backend.
            When there's something in the search bar, just refresh the data for corresponding items
    _sign: Signing for slide list item. Get the trackno for of this list item and go to backend server to change corresponding status to 1
    _slide: A helper function, calling _sign and _onRefresh. To auto-refresh when status changed.
    _update: When entering full name in search bar and search, patch to the backend server to change all package status belongs to that person to 1 
    _mark: A helper function, calling _update and _onRefresh. To auto-refresh when status changed.
    
    Corresponding backend models:
    SignatureHandler: doGet function to get data from searching, doPatch function to change status by name
    SignHandler: doPatch to change status with a specific tracking number.
    
### Detail2 page
    Views: Card view to see all the details of one package
    Functions:
    _update: update status by patch to the backend server with the trackno send from the signature page.
    _mark: A helper function, calling _update and _onRefresh. To auto-refresh when status changed.(haven't implemented _onRefresh)
    
    Corresponding backend models:
    SignHandler: doPatch to change status with a specific tracking number.
    
### Search page
    Views: ListView with click to jump corresponding detail page
    Functionality:
    Showing all results search by a keyword, sended from the student page, signature page and filter page.
    
## SignIn page

## Tracking page

## AddPack page

## worker page

## filter page
    
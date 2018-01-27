/** Example of implementing REST API handlers.
    @note  These methods operate on local variables instead 
    of database tables. In an actual app, the methods of Handler classes 
    should use JDBC to perform SQL operations instead. */
import java.io.*;
import java.util.ResourceBundle;
import java.util.Scanner;
import java.sql.*;
import java.sql.DriverManager;
import java.lang.*;

class ExampleRestModel extends RestApiModel {
  Statement st;
  public ExampleRestModel(Statement tmp) {
    addHandler("/", new CountHandler());
    addHandler("/names", new NamesHandler());
    addHandler("/packages", new PackagesHandler());
    st = tmp;
  }
  

  /** inner class for implementing API for url "/" (count server) */

  class PackagesHandler extends RestApiHandler{
    public String doGet(HttpParser p){
      String jsonStr = new String("{ \"packages\": [\n");
      try{
        String rows = "SELECT * FROM packages";
        ResultSet rs = st.executeQuery(rows);
        while( rs.next()){
        String trackno = rs.getString("trackno");
        String name = rs.getString("first") + " " + rs.getString("last");
        String carrier = rs.getString("carrier");
        String year = rs.getString("year");
        String month = rs.getString("month");
        String day = rs.getString("day");
        int s = rs.getInt("status");
        String status = "";
        if(s == 0) status = "unsigned";
        else status = "signed";
        
        jsonStr += "    ";
        jsonStr += "{\"trackno\": \"" + trackno + "\", \"name\" : \"" + name + "\", \"year\" : \"" + year + "\", \"month\" : \"" + month + "\", \"day\" : \"" + day + "\", \"carrier\" : \"" + carrier + "\", \"status\" : \"" + status + "\"},";
        

        System.out.println(jsonStr);
      }
         
      }catch(Exception e){
        System.out.println(e.getMessage());
      }
      
    jsonStr = jsonStr.substring(0, jsonStr.length()-1) + "\n";
    jsonStr += " ] }";
    return p.makeJsonReply(200, jsonStr);
    }
  }



}

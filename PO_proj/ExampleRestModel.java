import java.util.Scanner;
import java.sql.*;
import java.sql.DriverManager;
import java.lang.*;

class ExampleRestModel extends RestApiModel {
  Statement st;
  public ExampleRestModel(Statement tmp) {
    addHandler("/packages", new PackagesHandler());
    addHandler("/signature", new SignatureHandler());
    st = tmp;
  }
    
public String verifyUser(HttpParser p) {
        /* Simulates SQL   SELECT val FROM count;   */
        int isExist = 0;
        String isWorker = "0";
        try{
            /* ask for verification of user */
            PreparedStatement ps = st.getConnection().prepareStatement("SELECT isWorker FROM userList WHERE email = ?;");
            System.out.println( "SQL check: " + p.getRequestURL().substring(6,p.getRequestURL().length()) );
            ps.setString( 1, p.getRequestURL().substring(6,p.getRequestURL().length() ));
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                System.out.println(rs.getString(1));
                isWorker = rs.getString(1);
                isExist++;
                break;
            }
        }
        catch (SQLException e){
            System.out.println("SQLException caught: " + e.getMessage() );
        }
        if ( isExist == 0){
            // add user
            
        }
        return p.makeJsonReply(200,isWorker);
    }


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

class SignatureHandler extends RestApiHandler{
    public String doGet(HttpParser p){
      String jsonStr = new String("{ \"packages\": [\n");
      try{
        String rows = "SELECT * FROM packages";
        ResultSet rs = st.executeQuery(rows);
        while( rs.next()){
        String trackno = rs.getString("trackno");
        String first = rs.getString("first") + " " + rs.getString("last");
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


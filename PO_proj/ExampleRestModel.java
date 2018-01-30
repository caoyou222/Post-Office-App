/** Example of implementing REST API handlers.
    @note  These methods operate on local variables instead 
    of database tables. In an actual app, the methods of Handler classes 
    should use JDBC to perform SQL operations instead. */
import java.io.*;
import java.util.ResourceBundle;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.sql.*;
import java.sql.DriverManager;
import java.lang.*;

class ExampleRestModel extends RestApiModel {
  Statement st;
  public ExampleRestModel(Statement tmp) {
    addHandler("/packages", new PackagesHandler());
    addHandler("/addpackages", new AddPackagesHandler());
    addHandler("/signature", new SignatureHandler());
    addHandler("/signpack", new SignHandler());
    st = tmp;
  }
    
    public String verifyUser(HttpParser p) {
        int isExist = 0;
        /* analyze the request */
        String request = p.getRequestURL();
        Integer isWorker = 0;
        int pos = request.indexOf( (int)'@');
        String email = request.substring(6,pos);
        String token = request.substring( pos+ 1, request.length() ), oldToken = null;
        System.out.println("email " + email + " token " + token);
        Connection con;
        PreparedStatement ps;
        try{
            /* ask for verification of user */
            System.out.println("Start verification in dtb");
            con = st.getConnection();
            ps = con.prepareStatement("SELECT id, email, isWorker, token FROM userList WHERE email = ?;");
            ps.setString( 1, email );
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                isWorker = rs.getInt(3);
                oldToken = rs.getString(4);
                System.out.println(isWorker);
                isExist++;
            }
            if ( oldToken == null){
                // add token
                System.out.println("Start add token");
                ps = con.prepareStatement("UPDATE userList SET token = ? WHERE email = ?;");
                ps.setString(1,token);
                ps.setString(2,email);
                ps.executeUpdate();
                System.out.println("Finish update token for user " + email);
            }else{ // check token
                if ( !oldToken.equals(token) ){
                    // ask for overwritten
                    
                    
                }
            }
        }
        catch (SQLException e){
            System.out.println("SQLException caught: " + e.getMessage() );
        }
        return p.makeJsonReply(200,isWorker.toString());
    }
    
    public String getToken(HttpParser p) {
        String request = p.getRequestURL(), token = "";
        int pos = request.indexOf( (int)'@');
        String first = request.substring(15, pos);
        String last = request.substring(pos+1, request.length() );
        System.out.println("Try to get token from first and last: " + first + " " + last);
        Connection con;
        PreparedStatement ps;
        try{
            /* ask for token of user */
            con = st.getConnection();
            ps = con.prepareStatement("SELECT token FROM userList WHERE first = ? AND last = ?;");
            ps.setString( 1, first );
            ps.setString( 2, last );
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                token = rs.getString(1);
            }
        } catch (SQLException e){
            System.out.println("SQLException caught: " + e.getMessage() );
        }
        System.out.println("Find out token: " +token);
        return p.makeJsonReply(200,token);
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
        String last = rs.getString("last");
        String carrier = rs.getString("carrier");
        String year = rs.getString("year");
        String month = rs.getString("month");
        String day = rs.getString("day");
        int s = rs.getInt("status");
        String status = "";
        if(s == 0) status = "unsigned";
        else status = "signed";
        
        jsonStr += "    ";
        jsonStr += "{\"trackno\": \"" + trackno + "\", \"name\" : \"" + name + "\", \"last\" : \"" + last + "\", \"year\" : \"" + year + "\", \"month\" : \"" + month + "\", \"day\" : \"" + day + "\", \"carrier\" : \"" + carrier + "\", \"status\" : \"" + status + "\"},";
        

        //System.out.println(jsonStr);
      }
         
      }catch(Exception e){
        System.out.println(e.getMessage());
      }
      
    jsonStr = jsonStr.substring(0, jsonStr.length()-1) + "\n";
    jsonStr += " ] }";
    System.out.println(jsonStr);
    return p.makeJsonReply(200, jsonStr);


}
   

}

    class AddPackagesHandler extends RestApiHandler{
      public String doPost(HttpParser p){
        try{
            String packinfo = p.getParam("packinfo");
            String month = "";
            String day = "";
            String year = "";
            String track = "";
            String carrier = "";
            String lname = "";
            String fname = "";
            int status = 0;

            StringTokenizer str = new StringTokenizer(packinfo,",");
            while(str.hasMoreElements()){
                month = str.nextElement().toString();
                day = str.nextElement().toString();
                year = str.nextElement().toString();
                track = str.nextElement().toString();
                carrier = str.nextElement().toString();
                lname = str.nextElement().toString();
                fname = str.nextElement().toString();
            }

            String insert = "INSERT INTO packages VALUES (?,?,?,?,?,?,?,?)";

            PreparedStatement ps = st.getConnection().prepareStatement(insert);
            ps.setString(1,track);
            ps.setString(2,carrier);
            ps.setString(3,fname);
            ps.setString(4,lname);
            ps.setString(5,day);
            ps.setString(6,month);
            ps.setString(7,year);
            ps.setInt(8,status);

            ps.executeUpdate();
            System.out.println(packinfo);
            System.out.println(insert);

        }catch(Exception e){
        System.out.println(e.getMessage());
      }

        return p.makeReply(200, "OK");

      // try{
      //   JsonObject json = new JsonObject(jsonStr)
        

      //   String insert = "INSERT INTO packages VALUES(";

      //   return p.makeReply(200, "OK");
      // }catch(Exception e){
      //   System.out.println(e.getMessage());
      // }
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
        String name = rs.getString("first") + " " + rs.getString("last");
        String last = rs.getString("last");
        String carrier = rs.getString("carrier");
        String year = rs.getString("year");
        String month = rs.getString("month");
        String day = rs.getString("day");
        int s = rs.getInt("status");
        String status = "";
        if(s == 0) status = "unsigned";
        else status = "signed";
        
        jsonStr += "    ";
        jsonStr += "{\"trackno\": \"" + trackno + "\", \"name\" : \"" + name + "\", \"last\" : \"" + last + "\", \"year\" : \"" + year + "\", \"month\" : \"" + month + "\", \"day\" : \"" + day + "\", \"carrier\" : \"" + carrier + "\", \"status\" : \"" + status + "\"},";
        

        //System.out.println(jsonStr);
      }
         
      }catch(Exception e){
        System.out.println(e.getMessage());
      }
      
    jsonStr = jsonStr.substring(0, jsonStr.length()-1) + "\n";
    jsonStr += " ] }";
    return p.makeJsonReply(200, jsonStr);
    }

    public String doPost(HttpParser p) {
      return doPatch(p);
    }

    public String doPatch(HttpParser p) {
      System.out.println("patch");
      try{
        String name = p.getParam("name");
        String first = "", last = "";
        StringTokenizer nm = new StringTokenizer(name, " ");
        while(nm.hasMoreElements()){
            first = nm.nextElement().toString();
            last = nm.nextElement().toString();
        }
        PreparedStatement ps = st.getConnection().prepareStatement("UPDATE Packages SET status = 1 WHERE first = ? AND last = ?;");
        System.out.println(first + " " + last);
        ps.setString(1,first);
        ps.setString(2,last);
        ResultSet rs = ps.executeQuery();
      }catch(Exception e){
        System.out.println(e.getMessage());
      }
      
      return p.makeReply(200, "OK");
    }
}

class SignHandler extends RestApiHandler{
    public String doPost(HttpParser p) {
      return doPatch(p);
    }

    public String doPatch(HttpParser p) {
      System.out.println("sign");
      try{
        String tk = p.getParam("trackno");
        System.out.println(tk);
        PreparedStatement ps = st.getConnection().prepareStatement("UPDATE Packages SET status = 1 WHERE trackno = ?;");
        ps.setString(1,tk);
        ResultSet rs = ps.executeQuery();
      }catch(Exception e){
        System.out.println(e.getMessage());
      }
      
      return p.makeReply(200, "OK");
    }

}

}

import java.io.*;
import java.net.*;
import java.util.*;
import java.nio.charset.*;
import java.sql.*;
import java.sql.DriverManager;
import java.lang.*;

public class Backend {
    // methods
    /** Main class
     @param args arguments for the main function */
    public static void main(String[] args) {
        
        try {
            int port = Integer.parseInt(args[0]);
            System.out.println("Initializing for network communication... ");
            ServerSocket servSock = new ServerSocket(port);
            /* assert:  ServerSocket successfully created */
            
            while(true){
                System.out.println("Waiting for an incoming connection... ");
                Socket inSock = servSock.accept();
                Thread t = new Thread(new Worker(inSock));
                t.start();
            }
            /* successful read from socket */
            
            //inSock.close();
        }
        catch (IOException e) {
            System.err.println("Receiver failed.");
            System.err.println(e.getMessage());
            System.exit(1);  // an error exit status
            return;
        }
        
    }
}

/** A class for implements runnable.
 @author cao1 */
class Worker implements Runnable{
	//class variable
	/* A Socket*/
	Socket sock = null;
	static final int MAXBUFF = 100000;  

	//constructors
	/* A constructor initialzies sock
		@param Socket s */
	public Worker(Socket s){
		sock = s;
	}

	//methods
	/* a method for run Threads*/
	public void run(){
	try {
		ResourceBundle bundle = ResourceBundle.getBundle("javaconfig");
        String user = bundle.getString("jdbc.user");
        String password = bundle.getString("jdbc.password");
            
        String url = bundle.getString("jdbc.url") + bundle.getString("jdbc.dbname");
        Connection con;
        Class.forName(bundle.getString("jdbc.driver"));
        con = DriverManager.getConnection(url,user,password);
        Statement st = con.createStatement();

        ExampleRestModel model = new ExampleRestModel(st);

	  	InputStream inStream = sock.getInputStream();
	  	OutputStream outStream = sock.getOutputStream();
	  	/* assert:  input socket and stream initialized */
	  
	  	byte[] inBuff = new byte[MAXBUFF];
	  	int count;  // to hold number of bytes of I/O
	  	count = inStream.read(inBuff);  
	  // successful read from socket 
	  
	  	System.out.println("Successfully received the following " 
			     + count + " bytes:");
	  	System.out.write(inBuff, 0, count);
	  
	  	HttpParser parser = new HttpParser(inBuff, 0, count);  
	  	int code = parser.parseRequest();
	  
        String reply;
        String request = parser.getRequestURL();
        System.out.println(request);
        if (code != 200)
            reply = parser.makeReply(code);
        else {
            if ( request.length() >= 6 && request.substring(0,6).equals("/user/") ){
                System.out.println("Ask for: " + request.substring(6,14) );
                
                if ( request.length() >= 14 && request.substring(6,14).equals("getToken") )
                    reply = model.getToken(parser);
                else reply = model.verifyUser(parser);
            }
            else reply = model.handle(parser);
        }

	  	outStream.write(reply.getBytes());
	  	System.out.println("HTTP reply message sent");
	}catch(ClassNotFoundException e){
		System.err.println("Not found the class: " + e.getMessage());
	}catch(IOException e) {
	  System.out.println("client interaction failed.");
	  System.out.println(e.getMessage());
	}catch(SQLException e){
		System.err.println("SQL Problem: " + e.getMessage());
	} finally {
	  try{
	  sock.close();
	} catch(final IOException ex){
		System.out.println(ex.getMessage());
	}
	}
	/***** END section to implement within a Worker thread *****/

	}
}

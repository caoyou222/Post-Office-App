/** A class for socket client side.
    @author cao1 */

import java.io.*;
import java.net.*;
import java.util.*;
import java.nio.charset.*;

public class Backend {
	// class variables
  
  	/** A static final int for maxinBuff */
     
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
	ExampleRestModel model = new ExampleRestModel();
	try {
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
	  if (code != 200)
	    reply = parser.makeReply(code);
	  else {
	    reply = model.handle(parser);
	  }

	  outStream.write(reply.getBytes());
	  System.out.println("HTTP reply message sent");
	} catch (IOException e) {
	  System.out.println("client interaction failed.");
	  System.out.println(e.getMessage());
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

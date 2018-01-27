/* Example of a REST server -- RAB 1/18
   NOTE:  This demo server handles HTTP requests within the main thread, 
   but a production server should start a new thread to service each request
   Requires one command line arg:  
     1.  port number to use (on this machine). */

import java.io.*;
import java.net.*;
import java.util.*;
import java.nio.charset.*;

public class ExampleRestServer {
  /** IF non-null, print debug output prefixed by <code>DEBUG</code> */
  private static String DEBUG = "DEVEL ";

  /** Maximum message size.  Must be large enough for all messages to or 
      from a client */
  static final int MAXBUFF = 100000;  

  /** Used in guard for main loop; accessible to main thread and command thread*/
  static boolean contin = true; // continue with main loop?

  /** Socket for accepting incoming client connections */
  static ServerSocket servSock = null;

  /** Main program for this server */
  public static void main(String[] args) {
    int port = -1;
    final String prefix = new String("ExampleRestServer: ");

    // define API handlers
    ExampleRestModel model = new ExampleRestModel();

    if (DEBUG != null) {
      System.out.println(DEBUG + "model handler keys: " + 
			 model.getHandlerKeys());
      System.out.println(DEBUG + "model handler values: " + 
			 model.getHandlerValues());
    }

    // define and start a thread to process commands from standard input,
    // including EXIT to shut down this server
    Thread commandThread = getCommandThread(prefix + "CMD: ");
    commandThread.start();

    // perform server initialization
    try {
      port = Integer.parseInt(args[0]);
      System.out.println("Initializing for network communication... ");
      servSock = new ServerSocket(port);
      /* assert:  ServerSocket successfully created */
    } catch (IOException e) {
      System.err.println(prefix + "init failure.");
      System.err.println(e.getMessage());
      System.exit(1);  // an error exit status
      return;
    }
    // successful initialization

    /* MAIN LOOP:  repeatedly receive new HTTP requests and reply to them,
       using a fresh Socket connection per request
       NOTE:  In this simple demo, requests are handled in main thread, 
       NOT a separate Worker thread. */

    int failcount = 0;  // number of consec failures with a client
    while (contin) {
      try {
	System.out.println("Waiting for an incoming connection... ");
	Socket inSock = servSock.accept();

	/***** BEGIN section to implement within a Worker thread *****/

	// try {
	//   InputStream inStream = inSock.getInputStream();
	//   OutputStream outStream = inSock.getOutputStream();
	//   /* assert:  input socket and stream initialized */
	  
	//   byte[] inBuff = new byte[MAXBUFF];
	//   int count;  // to hold number of bytes of I/O
	//   count = inStream.read(inBuff);  
	//   // successful read from socket 
	  
	//   System.out.println("Successfully received the following " 
	// 		     + count + " bytes:");
	//   System.out.write(inBuff, 0, count);
	  
	//   HttpParser parser = new HttpParser(inBuff, 0, count);  
	//   int code = parser.parseRequest();
	  
	//   if (DEBUG != null) 
	//     dumpParseResults(parser);	
	  
	//   String reply;
	//   if (code != 200)
	//     reply = parser.makeReply(code);
	//   else {
	//     reply = model.handle(parser);
	//   }
	  
	//   if (DEBUG != null) 
	//     System.out.println(DEBUG + "Sending HTTP reply:\n" + reply + 
	// 		       "\n" + DEBUG + "End of reply");
	  
	//   outStream.write(reply.getBytes());
	//   System.out.println("HTTP reply message sent");
	// } catch (IOException e) {
	//   System.out.println(prefix + "client interaction failed.");
	//   System.out.println(e.getMessage());
	// } finally {
	//   inSock.close();
	// }

	// /***** END section to implement within a Worker thread *****/
	  
      } catch (IOException e) {
	if (servSock.isClosed()) {
	  break;
	} else {
	  System.out.println(prefix + "client interaction failed.");
	  System.out.println(prefix + e.getMessage());
	  System.out.println(prefix + "trying again");
	}
      }
    }
    System.out.println(prefix + "terminating command thread");
    try {
      System.in.close();
      commandThread.join();
      System.out.println(prefix + "exiting");
    } catch (IOException e) {
      System.err.println(prefix + "error closing standard input");
    } catch (InterruptedException e) {
      System.err.println(prefix + "interrupted when terminating command thread");
    }
    return;
  }
  
  /**  Create the command thread 
       @param prefix A string to prepend to any lines of output 
       @return A thread for obtaining commands from standard input, such as 
       EXIT (orderly termination of the server) */
  public static Thread getCommandThread(String prefix) {
    return new Thread(new Runnable () {
	  public void run() {
	    System.out.println(prefix + "starting command thread");
	    System.out.flush();
	    byte [] buff = new byte[100];
	    int count;
	    try {
	      while ((count = System.in.read(buff)) >= 0) {
		String inLine = new String(buff, 0, count);
		if (inLine.trim().equals("EXIT")) {
		  contin = false; 
		  servSock.close();
		  System.out.println(prefix + "command thread returning");
		  return;
		} else {
		  System.out.println(prefix + "Unknown standard-input command."+ 
				     "Enter EXIT to quit");
		}
	      }
	    } catch (IOException e) {
	      System.err.println(prefix+"error reading standard input, aborting"
				 + e.getMessage());
	      contin = false;
	      return;
	    }
	  }
	});

  }

//   /** Print fields in a parser object, typically called for debugging 
//       after parsing an incoming HTTP request 
//       @param parser A parser object
//       @sc Print selected fields in <code>parser</code> to standard output */

//   private static void dumpParseResults(HttpParser parser) {
//     System.out.println(DEBUG + "getRequestURL() --> " + 
// 		       parser.getRequestURL());
//     System.out.println(DEBUG + "getURLBase() --> " + parser.getURLBase());
//     System.out.println(DEBUG + "getURLId() --> " + parser.getURLId());
    
//     System.out.println(DEBUG + "=== Printing headers ===");
//     for (Enumeration<String> e = parser.getHeaders().keys(); 
// 	 e.hasMoreElements(); ) {
//       String next = e.nextElement();
//       System.out.println(DEBUG + next + ": " + parser.getHeader(next));
//     }
//     System.out.println(DEBUG + "=== End headers ===");
    
//     System.out.println(DEBUG + "=== Printing parameters ===");
//     for (Enumeration<String> e = parser.getParams().keys(); 
// 	 e.hasMoreElements(); ) {
//       String next = e.nextElement();
//       System.out.println(DEBUG + next + "=" + parser.getParam(next));
//     }
//     System.out.println(DEBUG + "=== End parameters ===");
//   }

// }


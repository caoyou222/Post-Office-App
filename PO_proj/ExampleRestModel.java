/** Example of implementing REST API handlers.
    @note  These methods operate on local variables instead 
    of database tables. In an actual app, the methods of Handler classes 
    should use JDBC to perform SQL operations instead. */

class ExampleRestModel extends RestApiModel {
  
  public ExampleRestModel() {
    addHandler("/", new CountHandler());
    addHandler("/names", new NamesHandler());
  }
  

  /** inner class for implementing API for url "/" (count server) */

  class CountHandler extends RestApiHandler {
    /** simulated value of count */
    /* simulates SQL   CREATE TABLE count (val int);
                       INSERT INTO count VALUES (0);     */
    int count_val = 0;  

    /** handles POST requests for url "/"
	@param p Results of parsing a POST HTTP request for url "/"
	@sc Adds 1 to stored counter
	@return HTTP reply for that request, i.e., OK 
        @note In our REST conventions, we should implement thie "Update" 
	operation as a PATCH HTTP request.  We're including this duplicate 
	as a POST for consistency with the original server */
    public String doPost(HttpParser p) {
      return doPatch(p);
    }

    /** handles PATCH requests for url "/"
	@param p Results of parsing a POST HTTP request for url "/"
	@sc Adds 1 to stored counter
	@return HTTP reply for that request, i.e., OK */
    public String doPatch(HttpParser p) {
      /* Simulates SQL   UPDATE count SET val = val + 1;   */
      count_val++;
      return p.makeReply(200, "OK");
    }

    /** handles GET requests for url "/"
	@param p Results of parsing a GET HTTP request for url "/"
	@return HTTP reply for that request, 
	i.e.,  JSON for current value of stored counter   */
    public String doGet(HttpParser p) {
      /* Simulates SQL   SELECT val FROM count;   */
      return p.makeJsonReply(200, 
			     "{ count: " + Integer.toString(count_val) + " }");
    }
  }


  /** inner class for implementing API for url "/names" (name server) 
      @note <strong>WARNING:</strong> This simulation using an array
      of Strings instead of an database table has a potential race condition!
      If this were a multithreaded server, all of the handler methods that 
      interact with the array <code>names[]</code> or variable <code>ct</code> 
      need to be <code>synchronized</code> in order to prevent interference
      among multiple threads.  <em>But</em>, individual SQL commands for a 
      DBMS such as Postgres are <em>atomic</em>, which means there is no 
      danger of race conditions with (single) SQL commands actual database 
      tables. */ 

  class NamesHandler extends RestApiHandler {
    /** maximum capacity of array <code>names[]</code> 
        @note Would not be necessary if we implemented in database */
    static final int maxnames = 10000;

    /** simulated value of names table */
    /* simulates SQL    CREATE TABLE names (name text);    */
    String [] names = new String[maxnames];  
    /** number of elements in array <code>names[]</code> 
        @note Would not be necessary if we implemented in database */
    int ct = 0;

    /** handles PATCH requests for url "/names"
	@param p Results of parsing a PATCH HTTP request for url "/names"
	@sc Adds value for POST-style parameter <code>name</code> to 
	the <code>names</code> database table.
	@return HTTP reply for that request, i.e., OK  
	@note <strong>WARNING:</strong> Potential race condition!  See 
	class description.    */
    public String doPatch(HttpParser p) {
      /* Simulates SQL   INSERT INTO names VALUES (&sto:ENTRY;);   */
      if (ct == maxnames)
	return p.makeReply(500, "Simulated table full");
      // safe to insert into the simulated table
      names[ct++] = p.getParam("name");
      return p.makeReply(200, "OK");
    }

    /** handles POST requests for url "/names"
	@param p Results of parsing a POST HTTP request for url "/names"
	@sc Adds 1 to stored counter
	@return HTTP reply for that request, i.e., OK 
        @note In our REST conventions, we should implement thie "Update" 
	operation as a PATCH HTTP request.  We're including this duplicate 
	as a POST for consistency with the original server */
    public String doPost(HttpParser p) {
      return doPatch(p);
    }

    /** handles GET requests for url "/names"
	@param p Results of parsing a GET HTTP request for url "/names"
	@return HTTP reply for that request, 
	i.e.,  JSON for current values in names[]   
	@note <strong>WARNING:</strong> Potential race condition!  See 
	class description.    */
    public String doGet(HttpParser p) {
      /* Simulates SQL   SELECT name FROM names;   */
      String jsonStr = new String("{ \"names\": [\n");
      for (int i = 0;  i < ct;  i++) {
	jsonStr += "    ";
	if (names[i] == null)
	  jsonStr += "null,\n";
	else
	  jsonStr += "\"" + names[i] + "\",\n";
      }
      // remove final comma if present and terminate string
      if (ct > 0)
	jsonStr = jsonStr.substring(0, jsonStr.length()-2) + "\n";
      jsonStr += "  ] }";  
      return p.makeJsonReply(200, jsonStr);
    }
  }
}

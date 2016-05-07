var chalk = require('chalk');
var monclient = require('mongodb').MongoClient; 
monclient.connect("mongodb://edu:edu@ds015879.mlab.com:15879/edurekadb", function( err, db) { 
	//             mongodb://edu:edu@ds015879.mlab.com:15879/edurekadb
  if(err) throw err;
  console.log("Connection established to  mongoDB  on cloud");
  var mydb = db;

 console.log(chalk.yellow("LISTING COLLECTIONs in current db"));
  mydb.collections(function(err, colls){
  	console.log(chalk.yellow("colls :-" + colls));
  	for(var i=0; i < colls.length; i++){  //**** use the method length only and only when the collection exists
  		console.log(chalk.yellow("Collection " + ( i + 1 ) + " : " + colls[i].namespace));
  	}
  	//mydb.close();
  });

 console.log(chalk.green("Listing documents withing a specific collection 'mystory'"));
  mydb.collection("mystory", function(err, coll){
  	if (err){
  		console.log(chalk.green("mystory collection not found!"));
  	}else{
		console.log(chalk.green("Found the  collection 'mystory' successfully!"));

	  	//find
	  	coll.find({}, function(er, cursor){
	  		if (!er){
	  			cursor.each(function(errorADoc, aDoc){
		  			if (aDoc){
		  				console.log(chalk.green(JSON.stringify(aDoc)));
		  			}else{
		  				console.log(chalk.green("-::::-"));
		  			}
	  		
	  			});
	  		}
	  		
	  	});//find()

	  	//count

		console.log(("Counting documents in the collection 'mystory' "));
	  	coll.count({}, function(err, count){ 
	  		console.log((" no of documents  =" + count));
	  	});//count()
	  	setTimeout( function(){ mydb.close(); }, 5000);
  	}	
  });// collection 
 });
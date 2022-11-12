const http = require('http');
const express = require("express");
const PORT = 4001;
const app = express();
const Users = require("../node_cluster/userEntity");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// const dbos=require("./db");
// Body parser middleware
app.use(express.json()); //middleware parse the incoming req with json payload
app.use(express.urlencoded({ extended: true })); //middleware parse the incoming req with json payloadurl encoded  strings or arrays. 
// Because CORS Thing (Google it if you do not know)

// or
//used for put and post
// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');
// // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// // combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
// app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log("/api/v1/"+PORT+req.method+JSON.stringify(req.body));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    next();
  });

  app.post("/users", (req, res) => {
    console.log(req.body+"req");
    Users.find()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));

    // Users.insertOne(req.body, function(err, res) {
    //   if (err) throw err;
    //   console.log("1 document inserted");
    // });

    
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("users").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

    res.status(200).json({
        nocatsfound: req.body,
      })

  });

  app.listen(PORT);



// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }

// const server = http.createServer(requestListener);
// server.listen(8080);
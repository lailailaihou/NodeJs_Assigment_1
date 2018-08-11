/*
 * Assignment 1 from NodeJS Master Class
 * Author : Lai
 * Description : Hello World API
 * Date : 2018/08/09
 */

 // Import Dependency
 var http = require('http');
 var url = require('url');
 // Import Config File
 var config = require("./config")

 // Initialize Http server
 var httpServer = http.createServer(function(req,res){
    serverLogic(req,res);
 });

 // Start the server
 httpServer.listen(config.httpPort, function(){
    console.log("Hello World API is running with port number " + config.httpPort);
})

// All Server logic will be running here
var serverLogic = function(req,res){
    // Get the Url and parse it
    var parsedUrl = url.parse(req.url, true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    req.on("data", function(data){
        // We will do nothing here
        console.log("Requent Received");
    });

    req.on("end",function(){
        // Choose the handler this request shuold go to, if not match with router will go to handler.NotFound
        //                                           if is not undefined will go to that router : else will go to handlers.NotFound
        var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.NotFound;

        //Construct the data object to send to the handlers
        var data = {
            'message' : ''
        };

        // router the request to the handler specific in the router
        chooseHandler(data,function(statusCode,payload){
            // Use the status code called back by the handler , or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload call back by the handlers, or default to an empty object.
            payload = typeof(payload) == 'object' ? payload : {};
            
            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);
            
            // Return the response
            res.setHeader("Content-Type","application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

// Define handlers
var handlers = {};

// hello handler will return a welcome message.
handlers.hello = function(data, callback){
    data.message = 'Hello welcome to my first API created by NodeJS and nice to meet you.';
    callback(200, data);
};

// Not Found Handler <= no need call, it will call automatically if not handler found
handlers.NotFound = function(data, callback){
    callback(404);
};

// Define router
var router = {
    'hello' : handlers.hello
};
var http = require("http");
var express = require("express") ;
var socketIo = require("socket.io");
var router = require("./routes") ;
var dataStore = require("./store") ;

var app = express(); //express initialise
app.use(express.static('../views')); // set the static files location

var server = app.listen("8080",function(){ //server listening on 8080
    console.log("Server listening on: http://localhost:%s", 8080);
})

// Socket.io
var io = socketIo().listen(server);

// socket.io events
io.on( "connection", function( socket )
{
    console.log( "A user connected" , dataStore.getUserNames());

    socket.emit('getStatsAtStart',dataStore.getUserNames()) ;
    socket.on( 'userAdd', function( data )
    {
      dataStore.addNewUser(data) ;
      console.log(dataStore);
      socket.emit('userAdded',dataStore.getUserNames()) ;
      socket.broadcast.emit('userAdded',dataStore.getUserNames()) ;

    });

});

var allClients = [] ;
// socket.io events
io.on( "connection", function( socket )
{


    console.log( "A user connected" , dataStore.getUserNames());

    socket.emit('getStatsAtStart',dataStore.getUserNames()) ;
    socket.on( 'userAdd', function( data )
    {
        dataStore.addNewUser(data) ;
        allClients.push({"socketId":socket.id, "userName":data });
        socket.emit('userCountChanged',dataStore.getUserNames()) ;
        socket.broadcast.emit('userCountChanged',dataStore.getUserNames()) ;

       var newUser = allClients.find(function (aUser) {
            return aUser.socketId === socket.id;
        }).userName;

    });


    socket.on( 'disconnect', function(){
        var discUserObj = allClients.find(function (aUser) {
            return aUser.socketId === socket.id;
        });
        if(discUserObj){
            dataStore.removeUser(discUserObj.userName) ;
            socket.emit('userCountChanged',dataStore.getUserNames()) ;
            socket.broadcast.emit('userCountChanged',dataStore.getUserNames()) ;
        }



   });

});

var http = require("http");
var path = require("path");
var express = require("express") ;
var socketIo = require("socket.io");
var dataStore = require("./server/store") ;
var router = require("./server/routes") ;
var app = express(); //express initialise

app.use('/views', express.static(__dirname + '/views'));
app.use(router);

var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
var server = app.listen(server_port,server_host,function(){
    console.log('Listening on port %d', server_port);
})

// Socket.io
var io = socketIo().listen(server);

var allClients = [] ;
// socket.io events
io.on( "connection", function( socket )
{


    console.log( "A user connected" , dataStore.userMgmt.getUserNames());
    // if(dataStore.comments.getAllComments().length <=0 )
    // {
    //     dataStore.comments.setUpTestComments();
    // }


    socket.emit('getStatsAtStart',dataStore.userMgmt.getUserNames()) ;
  //  socket.emit('getAllComments',dataStore.comments.getAllComments()) ;

    socket.on( 'userAdd', function( data )
    {
        dataStore.userMgmt.addNewUser(data) ;
        allClients.push({"socketId":socket.id, "userName":data });
        socket.emit('userCountChanged',dataStore.userMgmt.getUserNames()) ;
        socket.broadcast.emit('userCountChanged',dataStore.userMgmt.getUserNames()) ;

       var newUser = allClients.find(function (aUser) {
            return aUser.socketId === socket.id;
        }).userName;

    });


    socket.on( 'disconnect', function(){
        var discUserObj = allClients.find(function (aUser) {
            return aUser.socketId === socket.id;
        });
        if(discUserObj){
            dataStore.userMgmt.removeUser(discUserObj.userName) ;
            socket.emit('userCountChanged',dataStore.userMgmt.getUserNames()) ;
            socket.broadcast.emit('userCountChanged',dataStore.userMgmt.getUserNames()) ;
        }

   });

});

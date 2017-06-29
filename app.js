var express = require('express');
var http = require('http');


var app = express() ;
var server = http.createServer(app) ;
server.listen(3000);
var io = require('socket.io')(server);
var client = 0 ;// counter of clients on connection

// chat room page
app.get('/chat',function(req,res){
    res.sendFile(__dirname+'/chat.html');
});

console.log('run on port 3000')

//clients are online
io.on('connection',function(socket){
    console.log('you are in chat room');
// how many users are online 
    client++;
// trigger 'send message' event when users send messages
    socket.on('send message',function(data){
        console.log("message:"+data) ;
        io.emit('send message',data) ;
    });
    io.sockets.emit('broadcast',{description:client+' users connected ~'});
    
    
/*
    setTimeout(function(){
        //socket.send('Sent a message 4seconds after connection!');  // send message to client on 'message' event after 4 seconds
        socket.emit('send message', { description: 'A custom event named send message Event!'});
    },4000) ;
*/

// trigger 'disconnect' event when users disconnect
    socket.on('disconnect',function(){
        client-- ;
        console.log('a user disconnected');
        io.sockets.emit('broadcast',{description:client+' users connected ~'})
    });

});
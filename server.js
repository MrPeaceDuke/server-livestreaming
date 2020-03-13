var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src' + '/app' + '/index.html');
});
app.get('/view', function (req, res) {
    res.sendFile(__dirname + '/src' + '/app' + '/view.html');
});
var capturedStream = null;
io.on('connection', function (socket) {
    
    socket.on('signal', function (data) {
        socket.emit('signal', capturedStream);
    });
    socket.on('test', function (data) {
        console.log(data);
    });
    socket.on('streaming', function (data) {
        console.log('Streaming running');
        socket.emit('signal', data);
    });
});
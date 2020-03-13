var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
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
        capturedStream = data;
    });
});
io.on('steaming', function (data) {
    capturedStream = data;
    console.log(data);
});
io.on('signal', function (data) {
    socket.emit('signal', capturedStream);
});
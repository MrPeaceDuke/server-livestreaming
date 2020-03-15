var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
console.log('Server started on 80 port');


app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/view', function (req, res) {
    res.render('view');
});
app.use(express.static('dist'));

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
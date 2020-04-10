var express = require('express'); // подключение express.js
var app = express(); // создание приложения используя express
var server = require('http').Server(app);//подключение http
var io = require('socket.io')(server);//подключение socket.io
var port = process.env.PORT || 3000;//переменная с выбором порта для приёма данных по нему.
//выбирается либо серверный 80 порт, либо 3000
server.listen(port);//запускается сервер
console.log('Server started on '+port+' port');//уведомляет в консоль о запуске сервера


app.set('view engine', 'ejs');//дополнительная библиотека для разметки страниц
app.set('views', './views');//указание директории с доступными страницами

app.get('/', function (req, res) {//маршрутизация страницы ведущего
    res.render('index');
});
app.get('/view', function (req, res) {//маршрутизация страницы слушателей
    res.render('view');
});
app.use(express.static('dist'));//указание директории статических файлов

io.on('connection', function (socket) { //функция на подключение по socket.io
    socket.on('streaming', function (data) { //на streaming
        socket.broadcast.emit('signal', data); //посылает всем слушателем data
    });
});
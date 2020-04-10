var express = require('express'); // ����������� express.js
var app = express(); // �������� ���������� ��������� express
var server = require('http').Server(app);//����������� http
var io = require('socket.io')(server);//����������� socket.io
var port = process.env.PORT || 3000;//���������� � ������� ����� ��� ����� ������ �� ����.
//���������� ���� ��������� 80 ����, ���� 3000
server.listen(port);//����������� ������
console.log('Server started on '+port+' port');//���������� � ������� � ������� �������


app.set('view engine', 'ejs');//�������������� ���������� ��� �������� �������
app.set('views', './views');//�������� ���������� � ���������� ����������

app.get('/', function (req, res) {//������������� �������� ��������
    res.render('index');
});
app.get('/view', function (req, res) {//������������� �������� ����������
    res.render('view');
});
app.use(express.static('dist'));//�������� ���������� ����������� ������

io.on('connection', function (socket) { //������� �� ����������� �� socket.io
    socket.on('streaming', function (data) { //�� streaming
        socket.broadcast.emit('signal', data); //�������� ���� ���������� data
    });
});
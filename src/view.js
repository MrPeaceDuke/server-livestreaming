const io = require('socket.io-client');
const $ = require('jquery');

var socket = io.connect();

var check = true;
var videoData = [];
var superBuffer = null;

var check = true;
socket.on('signal', (videoStream) => {
	var video = document.querySelector('viewer');
	video.src = videoStream;
	video.load();
	video.onloadeddata = function() {
		URL.revokeObjectURL(video.src);
		video.play();
	}
	//video.srcObject

	//video.play();

	console.table(videoStream);
});
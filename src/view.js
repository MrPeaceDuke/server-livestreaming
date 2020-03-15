const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('viewer');

var socket = io.connect();

var blobs = [];
var concatenatedBlobs = new Blob(blobs);

socket.on('signal', (videoStream) => {
	console.table(videoStream);
	var video = document.querySelector('viewer');
	video.srcObject = videoStream;
	video.load();
	video.onloadeddata = function() {
		URL.revokeObjectURL(video.src);
		video.play();
	}
	
});
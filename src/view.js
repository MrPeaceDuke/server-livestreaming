const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('viewer');

var socket = io.connect();

var blobs = [];
var concatenatedBlobs = new Blob(blobs);

socket.on('signal', (videoStream) => {
	console.table(videoStream);
	var video = document.querySelector('viewer');
	canvas.srcObject = videoStream;
	canvas.load();
	canvas.onloadeddata = function() {
		URL.revokeObjectURL(canvas.srcObject);
		canvas.play();
	}
	
});
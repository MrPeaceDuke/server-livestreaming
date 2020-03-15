const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('viewer');

var socket = io.connect();

var blobs = [];
var concatenatedBlobs = new Blob(blobs);

socket.on('signal', (videoStream) => {
	console.table(videoStream);
	if ('srcObject' in canvas) {
		canvas.srcObject = videoStream;
	  } else {
		// Avoid using this in new browsers, as it is going away.
		canvas.src = URL.createObjectURL(videoStream);
	}
	canvas.srcObject = videoStream;
	canvas.load();
	canvas.onloadeddata = function() {
		URL.revokeObjectURL(canvas.srcObject);
		canvas.play();
	}
	
});
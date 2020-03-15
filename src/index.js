const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('videoStream');
var stream = null; //canvas.captureStream(25);
var recordedChunks = [];
var options = { mimeType: "video/webm; codecs=vp9" };

//mediaRecorder.start();

var FPS = 30;
var socket = io.connect('http://localhost');

if(document.getElementById('btnStart')) {
	document.getElementById('btnStart').onclick = ()=>{
		startCapture();
	};
}

async function startCapture(displayMediaOptions) {
	let captureStream = null;
	startedCapture = true;
	try {
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		socket.emit('streaming', captureStream);
		// socket.emit('test', { my: 'data' });
		canvas.srcObject = captureStream;
		stream = canvas.captureStream(25);
		mediaRecorder = new MediaRecorder(stream, options);
		mediaRecorder.start();
		var timerSendData = setInterval(()=>{
			console.log('timerSendData running');
			socket.emit('streaming', mediaRecorder.requestData());
		}, 1000);
	} catch(err) {
		console.error("Error: " + err);
	}
	return captureStream;
}
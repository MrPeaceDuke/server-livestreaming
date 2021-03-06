const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('videoStream');
var stream = null; 
var options = { mimeType: "video/webm; codecs=vp9" };
var chunks = [];

//mediaRecorder.start();

var FPS = 30;
var socket = io.connect();

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
		canvas.srcObject = captureStream;
		mediaRecorder = new MediaRecorder(captureStream);
		mediaRecorder.mimeType = 'video/webm';
   		mediaRecorder.start(5000);//
		mediaRecorder.ondataavailable = (e) => {
			chunks.push(e.data);
			setTimeout(sendData(), 5010);
		}
	} catch(err) {
		console.error("Error: " + err);
	}
	return captureStream;
}

function sendData()
{
	const superBuffer =  new Blob(chunks, {
        type: 'video/webm'
		});
	console.table(superBuffer);
	socket.emit('streaming', superBuffer);
	
	chunks = [];
}
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
// socket.on('signal',(data) => {
// 	console.log(data);
// });
async function startCapture(displayMediaOptions) {
	let captureStream = null;
	startedCapture = true;
	
	try {
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		// socket.emit('test', { my: 'data' });
		canvas.srcObject = captureStream;
		stream = canvas.captureStream(25);
		mediaRecorder = new MediaRecorder(stream, options);
		mediaRecorder.mimeType = 'video/webm';
   		mediaRecorder.start(5000);//
		mediaRecorder.ondataavailable = (e) => {
			chunks.push(e.data);
			setTimeout(sendData(), 5010);
		}
		// var timerSendData = setInterval(() => {
		// 	mediaRecorder.requestData();
			
		// 	socket.emit('streaming', chunks);
		// }, 1000);
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
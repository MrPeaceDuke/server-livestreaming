const io = require('socket.io-client');
const $ = require('jquery');

var socket = io.connect();

let blobArray = [];
let currentTime = 0;
var video = document.getElementById('viewer');

socket.on('signal', (videoStream) => {

	blobArray.push(new Blob([new Uint8Array(videoStream)],{'type':'video/mp4'}));
	currentTime = video.currentTime;
	let blob = new Blob(blobArray,{'type':'video/mp4'});
	video.src = window.URL.createObjectURL(blob);
	video.currentTime = currentTime;
	video.play();

	console.table(videoStream);
});
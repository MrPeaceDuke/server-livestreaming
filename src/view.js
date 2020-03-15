const io = require('socket.io-client');
const $ = require('jquery');

var socket = io.connect();

var check = true;
var videoData = [];
var superBuffer = null;
let blobArray = [];
var check = true;
socket.on('signal', (videoStream) => {
	var video = document.getElementById('viewer');
	// var videoUrl = window.URL.createObjectURL(videoStream.data);
	// video.src = videoUrl;
	// video.load();
	// video.onloadeddata = function() {
	// 	URL.revokeObjectURL(video.src);
	// 	video.play();
	// }

	blobArray.push(new Blob([new Uint8Array(videoStream)],{'type':'video/mp4'}));
	// let currentTime = video.currentTime;
	let blob = new Blob(blobArray,{'type':'video/mp4'});
	video.src = window.URL.createObjectURL(blob);
	video.currentTime = currentTime;
	video.play();

	console.table(videoStream);
});
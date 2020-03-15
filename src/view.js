const io = require('socket.io-client');
const $ = require('jquery');

var socket = io.connect();




var arrayOfBlobs = [];
setInterval(function() {
	arrayOfBlobs.append(nextChunk());
	appendToSourceBuffer();
}, 1000);

var mediaSource = new MediaSource();

var url = URL.createObjectURL(mediaSource);

var video = document.getElementById("viewer");
video.src = url;

var sourceBuffer = null;
mediaSource.addEventListener("sourceopen", function()
{
	sourceBuffer = mediaSource.addSourceBuffer("video/webm; codecs=\"opus,vp8\"");
	sourceBuffer.addEventListener("updateend", appendToSourceBuffer);
});
function appendToSourceBuffer()
{
	if (
		mediaSource.readyState === "open" &&
		sourceBuffer &&
		sourceBuffer.updating === false
	)
	{
		sourceBuffer.appendBuffer(arrayOfBlobs.shift());
	}

	if (
		video.buffered.length &&
		video.buffered.end(0) - video.buffered.start(0) > 1200
	)
	{
		sourceBuffer.remove(0, video.buffered.end(0) - 1200)
	}
}

socket.on('signal', (videoStream) => {
	console.log(videoStream);
	sourceBuffer.appendBuffer(videoStream);
});
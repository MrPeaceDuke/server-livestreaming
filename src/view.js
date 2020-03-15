const io = require('socket.io-client');
const $ = require('jquery');

var canvas = document.getElementById('viewer');

var socket = io.connect('http://localhost');
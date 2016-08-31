'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var stream;

var n = navigator.getUserMedia({
  audio: true
}, function(localMediaStream) {
  window.stream = stream = localMediaStream;
  var audioElement = document.querySelector('audio');
  try {
    audioElement.src = window.URL.createObjectURL(localMediaStream);
  } catch (event0) {
    try {
      audioElement.mozSrcObject = localMediaStream;
      audioElement.play();
    } catch (event1) {
      console.log('Error setting video src: ', event1);
    }
  }
}, function(error) {
  console.log('navigator.getUserMedia error: ', error);
});

console.log(n);
/*
// feature detection 
var session = {
  audio: true,
  video: false
};

if (!navigator.getUserMedia)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia){
    navigator.getUserMedia(session, initializeRecorder, function(e) {
    alert('Error capturing audio.');
    });
} else alert('getUserMedia not supported in this browser.');

console.log('got user media');



var recordRTC = null;
navigator.getUserMedia(session, initializeRecorder, onError);


function initializeRecorder(stream) {
  var audioContext = window.AudioContext;
  var context = new audioContext();
  var audioInput = context.createMediaStreamSource(stream);
  var bufferSize = 2048;
  // create a javascript node
  var recorder = context.createScriptProcessor(bufferSize, 1, 1);
  // specify the processing function
  recorder.onaudioprocess = recorderProcess;
  // connect stream to our recorder
  audioInput.connect(recorder);
  // connect our recorder to the previous destination
  recorder.connect(context.destination);
}

function convertFloat32ToInt16(buffer) {
  l = buffer.length;
  buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  console.log(buffer);
  return buf.buffer;
}

function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  console.log(left);
  window.Stream.write(convertFloat32ToInt16(left));
}

var client = new BinaryClient('ws://localhost:9001');

client.on('open', function() {
  // for the sake of this example let's put the stream in the window
  window.Stream = client.createStream();
});
*/
var video;
var recordedChunks = [];
var mediaRecorder;
const constraints = {
  video: { width: 1280, height: 720 }
  ,
  audio: false,
};

function startStream() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video = document.querySelector('video')
      video.srcObject = stream;
      video.onloadeddata = (e) => {
        video.play();
      };
    });
}

function pauseStream() {
  video.pause();
}

function stopStream() {
  video.srcObject.getTracks().forEach(track => {
    if (track.readyState == 'live') {
      track.stop();
    }
  })
  play();
}

function startRecording() {

  var options = {
    //audioBitsPerSecond : 128000,
    //videoBitsPerSecond : 2500000,
    mimeType: 'video/webm'
  }
  mediaRecorder = new MediaRecorder(video.srcObject, options); //Note: video.srcObject is the stream
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  } else {
    // DO LATER
  }
}

function play() {
  var superBuffer = new Blob(recordedChunks);
  video.src = window.URL.createObjectURL(superBuffer);
}

function download() {
  var blob = new Blob(recordedChunks, {
    type: 'video/webm'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'test.webm';
  a.click();
  window.URL.revokeObjectURL(url);
}

var onSuccess = function (streamRec) {
  var options = {
    //audioBitsPerSecond : 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/mp4'
  }
  var mediaRecorder = new MediaRecorder(stream, options);
  m = mediaRecorder;
}


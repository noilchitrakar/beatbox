navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    let audioURL = null;
    let loopButton = document.getElementById("loopBtn");
    let deleteLoopButton = document.getElementById("removeLoopBtn");
    let recordingStartTime = null;

    // Record button event
    const recordBtn = document.getElementById("recordBtn");
    recordBtn.addEventListener("click", function () {
      if (!recordBtn.classList.contains("recording")) {
        recordingStartTime = new Date(); // Set the recording start time
        mediaRecorder.start();
        recordBtn.classList.add("recording"); // Add the "recording" class
      } else {
        mediaRecorder.stop();
        recordBtn.classList.remove("recording"); // Remove the "recording" class
      }
    });

    // Stop button event
    document.getElementById("stopBtn").addEventListener("click", function () {
      mediaRecorder.stop();
      recordBtn.classList.remove("recording"); // Remove the "recording" class
    });

    // Collect audio data
    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    // Create audio URL and play recorded audio
    mediaRecorder.addEventListener("stop", function () {
      const audioBlob = new Blob(chunks);
      audioURL = window.URL.createObjectURL(audioBlob);

      // Create audio container
      const audioContainer = document.createElement("div");
      audioContainer.classList.add("audio-container");

      // Create audio element
      const audioPlayer = new Audio(audioURL);
      audioPlayer.controls = true;
      audioContainer.appendChild(audioPlayer);

      // Create recording info paragraph
      const recordingInfo = document.createElement("p");
      recordingInfo.innerHTML =
        "Recording created on: " + recordingStartTime.toLocaleString();
      audioContainer.appendChild(recordingInfo);

      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.href = audioURL;
      downloadLink.download = "recorded_audio.mp3";
      downloadLink.innerHTML = "Download MP3";
      audioContainer.appendChild(downloadLink);

      // Append the audio container to the audio list
      const audioList = document.getElementById("audioList");
      audioList.appendChild(audioContainer);
    });

    // Play button event
    document.getElementById("playBtn").addEventListener("click", function () {
      const audioPlayer = document.querySelector(".audio-container audio");
      if (audioPlayer) {
        audioPlayer.play();
      }
    });

    // Pause button event
    document.getElementById("pauseBtn").addEventListener("click", function () {
      const audioPlayer = document.querySelector(".audio-container audio");
      if (audioPlayer) {
        audioPlayer.pause();
      }
    });

    // Loop button event
    loopButton.addEventListener("click", function () {
      const audioPlayer = document.querySelector(".audio-container audio");
      if (audioPlayer) {
        audioPlayer.loop = true;
        audioPlayer.play();
      }
    });

    // Delete Loop button event
    deleteLoopButton.addEventListener("click", function () {
      const audioPlayer = document.querySelector(".audio-container audio");
      if (audioPlayer) {
        audioPlayer.loop = false;
      }
    });
  })
  .catch(function (err) {
    console.log("Error accessing audio API:", err);
  });

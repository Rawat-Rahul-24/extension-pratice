chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name === "play_track") {
    var trackName = msg.track;
    var audioEle = document.querySelector(".track-one");
    audioEle.src = trackName + ".mp3";
    audioEle.play();
  }

  if (msg.name == "pauseTrack") {
    var audioEle = document.querySelector(".track-one");

    audioEle.pause();
  }
});

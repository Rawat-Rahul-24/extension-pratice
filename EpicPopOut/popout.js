document.querySelector("button.play").addEventListener("click", function () {
  var track = document.querySelector("select").value;

  chrome.runtime.sendMessage({ name: "play_track", track: track });
});

document.querySelector("button.pause").addEventListener("click", function () {
  chrome.runtime.sendMessage({ name: "pauseTrack" });
});

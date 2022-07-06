const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
const path = require("path");
$id("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

let musicAudio = new Audio();
let allTracks;
let currentTrack;

const renderListHTML = (tracks) => {
  const tracksList = $id("tracks-list");
  const tracksListHTML = tracks.reduce((html, track) => {
    return (html += `<li class="music-track row list-group-item d-flex justify-content-between align-item-center">
      <div class="col-10">
        <i class="bi bi-music-note-beamed mr-2"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="bi bi-play-fill mr-2" data-id="${track.id}"></i>
        <i class="bi bi-trash-fill" data-id="${track.id}"></i>
      </div>
    </li>`);
  }, "");
  const emptyTrackHTML = "<div class=alert alert-primary>还没有添加音乐</div>";
  tracksList.innerHTML = tracks.length
    ? `<ul class="list-group mt-3">${tracksListHTML}</ul>`
    : emptyTrackHTML;
};

ipcRenderer.on("getTracks", (event, tracks) => {
  allTracks = tracks;
  renderListHTML(tracks);
});

$id("tracks-list").addEventListener("click", (e) => {
  e.preventDefault();
  const { dataset, classList } = e.target;
  const id = dataset && dataset.id;
  if (id && classList.contains("bi-play-fill")) {
    // 这里播放音乐
    currentTrack = allTracks.find((item) => item.id === id);
    musicAudio.src = currentTrack.path;
    musicAudio.play();
    classList.replace("bi-play-fill", "bi-pause");
  }
});

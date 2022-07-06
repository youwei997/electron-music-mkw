const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
const path = require("path");
$id("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

const renderListHTML = (tracks) => {
  const tracksList = $id("tracks-list");
  const tracksListHTML = tracks.reduce((html, track) => {
    return (html += `<li class="music-track row list-group-item d-flex justify-content-between align-item-center">
      <div class="col-10">
        <i class="bi bi-music-note-beamed mr-2"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="bi bi-file-play mr-2"></i>
        <i class="bi bi-trash-fill"></i>
      </div>
    </li>`);
  }, "");
  const emptyTrackHTML = "<div class=alert alert-primary>还没有添加音乐</div>";
  tracksList.innerHTML = tracks.length
    ? `<ul class="list-group mt-3">${tracksListHTML}</ul>`
    : emptyTrackHTML;
};

ipcRenderer.on("getTracks", (event, tracks) => {
  renderListHTML(tracks);
});

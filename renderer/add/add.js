const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
const path = require("path");

let musicFilePath = [];
$id("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
});

$id("add-music").addEventListener("click", () => {
  ipcRenderer.send("add-tracks", musicFilePath);
});

const renderListHTML = (paths) => {
  const musicList = $id("music-list");
  const musicItemsHTML = paths.reduce((html, item) => {
    return (html += `<li class="list-group-item">${path.basename(item)}</li>`);
  }, "");
  musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`;
};
ipcRenderer.on("selected-file", (event, path) => {
  console.log(path);
  if (Array.isArray(path)) {
    musicFilePath = path;
    renderListHTML(path);
  }
});

const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
const path = require("path");
$id("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
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
    renderListHTML(path);
  }
});

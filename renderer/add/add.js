const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
$id("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
});

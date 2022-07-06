const { ipcRenderer } = require("electron");
const { $id } = require("../helper");
$id("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

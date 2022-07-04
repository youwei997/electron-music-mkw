const { ipcRenderer } = require("electron");

document.getElementById("add-music-button").addEventListener("click", () => {
  console.log(11111);
  ipcRenderer.send("add-music-window");
});

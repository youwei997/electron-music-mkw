const { app, BrowserWindow, ipcMain } = require("electron");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile("./renderer/index/index.html");
  ipcMain.on("add-music-window", () => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      parent: mainWindow,
    });
    addWindow.loadFile("./renderer/add/add.html");
  });
});

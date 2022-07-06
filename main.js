const { app, BrowserWindow, ipcMain, dialog } = require("electron");

const DataStore = require("./renderer/MusicDataStore");
const myStore = new DataStore({ name: "Music-Data" });

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      show: false, // 配合下面的ready-to-show事件，会在内容加载完再显示。而不是一开始显示一个空白窗口，然后再加载内容
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    };
    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    this.loadFile(fileLocation);
    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

app.on("ready", () => {
  const mainWindow = new AppWindow({}, "./renderer/index/index.html");
  // 导航完成时触发
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.send("getTracks", myStore.getTracks());
  });
  ipcMain.on("add-music-window", () => {
    const addWindow = new AppWindow(
      {
        width: 500,
        height: 400,
        parent: mainWindow,
      },
      "./renderer/add/add.html"
    );
  });

  ipcMain.on("add-tracks", (event, tracks) => {
    myStore.addTracks(tracks);
    const newTracks = myStore.getTracks();
    mainWindow.send("getTracks", newTracks);
  });

  ipcMain.on("open-music-file", (event) => {
    dialog
      .showOpenDialog({
        properties: ["openFile ", "multiSelections"],
        filters: [{ name: "Music", extensions: ["mp3"] }],
      })
      .then((files) => {
        if (files.filePaths) {
          event.sender.send("selected-file", files.filePaths);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

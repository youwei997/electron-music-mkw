const { app, BrowserWindow, ipcMain, dialog } = require("electron");

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
  ipcMain.on("open-music-file", () => {
    dialog
      .showOpenDialog({
        properties: ["openFile ", "multiSelections"],
        filters: [{ name: "Music", extensions: ["mp3"] }],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

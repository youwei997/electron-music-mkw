const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  //  new BrowserWindow() 创建窗口
  const mainWindow = new BrowserWindow({
    width: 800, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      //网页功能设置
      nodeIntegration: true, // 是否集成node
    },
  });
  mainWindow.loadFile("index.html"); // 加载文件

  // const secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true,
  //   },
  //   parent: mainWindow, // 设置父级窗口，父级窗口关闭，当前窗口也关闭
  // });
  // secondWindow.loadFile("second.html");
});

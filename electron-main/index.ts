import { addMenu } from "./menu";

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('sendMessage', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win?.setTitle(title)
    });

    // 如果打包了，渲染index.html
    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, "./../dist/index.html"));
    } else {
        let url = "http://localhost:4300"; // 本地启动的vue项目路径
        mainWindow.loadURL(url);
    }

    return mainWindow;
}

app.whenReady().then(() => {
    const win = createWindow()
    addMenu(app, win);
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
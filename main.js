const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config');

const isDev =
  process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development" ? true : false;

let win;


function crateWindow() {
  win = new BrowserWindow({
    backgroundColor: '#1e1e1e',
    width: 800,
    height: 600,
    // transparent: true, 
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    titleBarOverlay: {
      color: '#e1e1e1',
      symbolColor: '#1e1e1e'
    },
    resizable: false,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    }

  })
  win.loadFile(config.url)
  // win.loadURL(config.url)
  // win.loadURL('https://www.google.com.br/')
  win.once("ready-to-show", () => {
    win.show();
  })
  
  if (isDev) {
    win.webContents.openDevTools();
  }
  
}

function toggleDevTools() {
  win.webContents.openDevTools();
}
function createShortcuts(){
  globalShortcut.register('Cmd+JOrCtrl+Shift+I', toggleDevTools)
}

app.whenReady()
.then(crateWindow)
.then(createShortcuts)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('active', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    crateWindow()
  }
})
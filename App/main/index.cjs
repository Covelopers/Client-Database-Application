// main/index.cjs
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // Add preload script if needed for IPC
            // preload: path.join(__dirname, 'preload.js')
        }
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

    if (isDev) {
        // Point to the Next.js dev server
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // Point to the built Next.js HTML file
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '..', 'out', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle any unhandled errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
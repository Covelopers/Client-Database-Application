const { app, BrowserWindow } = require('electron');
const path = require('path');
const { createServer } = require('http');

let mainWindow = null;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

    if (isDev) {
        // Development: point to Next.js dev server
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // Production: start a Next.js server internally
        const next = require('next');
        // @ts-ignore for CommonJS
        const nextApp = next({ dev: false, dir: path.join(__dirname, '..') });
        const handle = nextApp.getRequestHandler();

        await nextApp.prepare();

        const server = createServer((req, res) => handle(req, res));
        server.listen(3000, () => {
            // Load the Electron window once server is ready
            mainWindow!.loadURL('http://localhost:3000');
        });
    }

    mainWindow.on('closed', () => (mainWindow = null));
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Optional: catch uncaught errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
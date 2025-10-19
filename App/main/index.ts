import { app, BrowserWindow } from 'electron';
import path from 'path';
import { createServer } from 'http';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;

// Create a log file to debug
const logFile = path.join(app.getPath('userData'), 'app.log');
function log(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    // Also log to console for real-time debugging during development
    console.log(logMessage);
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (e) {
        console.error('Failed to write to log file:', e);
    }
}

async function createWindow() {
    log('Creating window...');

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    log('Window created');

    // ALWAYS open DevTools for debugging
    mainWindow.webContents.openDevTools();
    log('DevTools opened');

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    log(`isDev: ${isDev}, isPackaged: ${app.isPackaged}`);

    if (isDev) {
        // Development: point to Next.js dev server
        log('Loading dev server...');
        mainWindow.loadURL('http://localhost:3000');
    } else {
        log('Starting production server...');
        try {
            const appPath = app.getAppPath();
            log(`App path (Root of resources): ${appPath}`);

            // --- 1. Database Setup (Confirmed Correct) ---
            const dbPath = path.join(app.getPath('userData'), 'app.db');
            const dbUrl = `file:${dbPath}`;
            process.env.DATABASE_URL = dbUrl;
            log(`Database URL set to: ${dbUrl}`);

            // Copy database if it doesn't exist
            if (!fs.existsSync(dbPath)) {
                log('Database does not exist in user data, attempting to copy...');
                const sourcePath = path.join(appPath, 'prisma', 'app.db');
                log(`Looking for source database at: ${sourcePath}`);

                if (fs.existsSync(sourcePath)) {
                    fs.copyFileSync(sourcePath, dbPath);
                    log('Database copied successfully to user data folder');
                } else {
                    log('WARNING: Source database not found. Creating empty database file.');
                    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
                    fs.writeFileSync(dbPath, '');
                    log('Empty database created.');
                }
            } else {
                log('Database already exists in user data folder');
            }
            // ---------------------------------------------

            // --- 2. Next.js Server Setup ---
            const next = require('next');
            log('Next.js required');

            // @ts-ignore for CommonJS compatibility with Next.js
            const nextApp = next({ dev: false, dir: appPath });
            log('Next.js app created using dir: ' + appPath);

            const handle = nextApp.getRequestHandler();
            log('Got request handler');

            await nextApp.prepare();
            log('Next.js prepared successfully.');

            const server = createServer((req, res) => {
                // Log all incoming requests to debug routing
                log(`[SERVER] Request: ${req.method} ${req.url}`);
                handle(req, res);
            });

            server.listen(3000, () => {
                log('Server listening on port 3000');
                // Load the Electron window once server is ready
                if (mainWindow) {
                    log('Loading http://localhost:3000');
                    mainWindow.loadURL('http://localhost:3000');
                }
            });
        } catch (error) {
            // FIX: Define errorMessage here and safely extract the message
            let errorMessage = 'An unknown error occurred during server startup.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            log(`ERROR during production server start: ${errorMessage}`);

            if (mainWindow) {
                // Execute console.error to notify the renderer process
                mainWindow.webContents.executeJavaScript(`console.error('Failed to start application server: ${errorMessage}')`);
            }
        }
    }

    mainWindow.on('closed', () => {
        log('Window closed');
        mainWindow = null;
    });
}

// App event handlers
app.whenReady().then(() => {
    log('App ready');
    log(`User data path: ${app.getPath('userData')}`);
    log(`Log file: ${logFile}`);
    createWindow();
});

app.on('window-all-closed', () => {
    log('All windows closed');
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    log('App activated');
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Optional: catch uncaught errors
process.on('uncaughtException', (error) => {
    let errorMessage = 'An unknown uncaught exception occurred.';
    let errorStack = '';

    if (error instanceof Error) {
        errorMessage = error.message;
        errorStack = error.stack || '';
    }

    log(`Uncaught Exception: ${errorMessage}`);
    log(`Stack: ${errorStack}`);
    console.error('Uncaught Exception:', error);
});
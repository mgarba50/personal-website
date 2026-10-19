const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess;

function resolveFrontendIndex() {
  return path.join(process.resourcesPath, 'app.asar.unpacked', 'frontend', 'dist', 'yerwa-oracle', 'browser', 'index.html');
}

function resolveBackendEntry() {
  return path.join(process.resourcesPath, 'app.asar.unpacked', 'backend', 'dist', 'server.js');
}

function startBackend() {
  const backendEntry = resolveBackendEntry();
  backendProcess = spawn(process.execPath, [backendEntry], {
    env: {
      ...process.env,
      PORT: process.env.PORT || '4000',
      MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/yerwa-oracle',
      JWT_SECRET: process.env.JWT_SECRET || 'change-me',
      JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
    },
    stdio: 'ignore',
    detached: false
  });

  backendProcess.on('error', () => {
    dialog.showErrorBox('Yerwa Oracle Backend Error', 'Could not start backend process. Ensure this build contains backend/dist files.');
  });
}

async function createWindow() {
  startBackend();
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: '#05070d',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const indexPath = resolveFrontendIndex();
  await win.loadFile(indexPath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (backendProcess && !backendProcess.killed) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

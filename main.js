const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const { processImage } = require('./processor');

function createWindow(){
  const win = new BrowserWindow({
    width: 760,
    height: 460,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.removeMenu();
  win.loadFile('renderer.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if(process.platform !== 'darwin') app.quit(); });

ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'Images', extensions: ['jpg','png','jpeg'] }]});
  if(canceled) return [];
  return filePaths;
});

ipcMain.handle('process:image', async (event, opts) => {
  try {
    const out = await processImage(opts);
    return { ok: true, output: out };
  } catch (e) {
    console.error(e);
    return { ok: false, error: e.message };
  }
});

ipcMain.handle('open:folder', async (evt, folder) => {
  return shell.openPath(folder);
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  pickFile: () => ipcRenderer.invoke('dialog:openFile'),
  processImage: (opts) => ipcRenderer.invoke('process:image', opts),
  openFolder: (folder) => ipcRenderer.invoke('open:folder', folder)
});

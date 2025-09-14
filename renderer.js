const pickBtn = document.getElementById('pickBtn');
const fileInput = document.getElementById('fileInput');
const dropText = document.getElementById('dropText');
const templateEl = document.getElementById('template');
const exportBtn = document.getElementById('export');
const log = document.getElementById('log');

let selectedPath = null;

pickBtn.addEventListener('click', async () => {
  const res = await window.electronAPI.pickFile();
  if(res && res.length) { selectedPath = res[0]; log.textContent = `Selected: ${selectedPath}`; }
});

fileInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if(f) { selectedPath = f.path; log.textContent = `Selected: ${selectedPath}`; }
});

document.addEventListener('dragover', (e)=> e.preventDefault());
document.addEventListener('drop', (e)=> { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) { selectedPath = f.path; log.textContent = `Selected: ${selectedPath}`; } });

exportBtn.addEventListener('click', async () => {
  if(!selectedPath){ alert('Select a file first'); return; }
  const template = templateEl.value;
  log.textContent = 'Processing...';
  const result = await window.electronAPI.processImage({ input: selectedPath, template });
  if(result && result.ok){
    log.textContent = `Saved: ${result.output}`;
    // open folder:
    await window.electronAPI.openFolder(require('path').dirname(result.output));
  } else {
    log.textContent = `Error: ${result && result.error ? result.error : 'unknown'}`;
  }
});

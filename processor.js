const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const templates = {
  '2day': path.join(__dirname, 'templates', '2day.png'),
  '3day': path.join(__dirname, 'templates', '3day.png')
};

async function processImage({ input, template }) {
  if(!fs.existsSync(input)) throw new Error('Input not found');
  const tpl = templates[template] || templates['2day'];
  if(!fs.existsSync(tpl)) throw new Error('Template not found: ' + tpl);

  const outDir = path.join(require('os').homedir(), 'BannerTool-Outputs');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outName = `banner_${Date.now()}.jpg`;
  const outPath = path.join(outDir, outName);

  // Resize input to 286x410 and composite template on top
  const art = await sharp(input).resize(286, 410, { fit: 'cover' }).toBuffer();

  await sharp(art)
    .composite([{ input: tpl, gravity: 'centre' }])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  return outPath;
}

module.exports = { processImage };

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const SRC = path.join(__dirname, 'index.html');
const html = fs.readFileSync(SRC, 'utf-8');

// 1. Extract script tags
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
const scripts = [];
let m;
while ((m = scriptRegex.exec(html)) !== null) scripts.push(m[1]);

console.log(`Found ${scripts.length} script blocks`);

// 2. Parse the big JSON string (real HTML)
let realHtml;
for (const s of scripts) {
  const trimmed = s.trim();
  if (trimmed.startsWith('"<!DOCTYPE') || trimmed.startsWith('"<!doctype')) {
    realHtml = JSON.parse(trimmed);
    break;
  }
}
if (!realHtml) { console.error('ERROR: Could not find real HTML in bundle'); process.exit(1); }
console.log(`Real HTML: ${realHtml.length} chars`);

// 3. Extract resources from manifest
const manifestMatch = realHtml.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
let resources = {};
if (manifestMatch) {
  try {
    resources = JSON.parse(manifestMatch[1]);
    console.log(`Resources: ${Object.keys(resources).length} items`);
  } catch(e) { console.error('Manifest parse error:', e.message); }
}

// 4. Create directories
fs.mkdirSync(path.join(__dirname, 'images'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'fonts'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'js'), { recursive: true });

// 5. Extract and save resources
for (const [uuid, entry] of Object.entries(resources)) {
  const buf = Buffer.from(entry.data, 'base64');
  let finalBuf;
  if (entry.compressed) {
    finalBuf = zlib.gunzipSync(buf);
  } else {
    finalBuf = buf;
  }

  let ext = 'bin';
  let filename;
  if (entry.mime.includes('svg')) {
    ext = 'svg';
    if (uuid === '199622af-7e1c-492b-b625-8dcfe2035f61') filename = 'logo.svg';
    else filename = 'logo-footer.svg';
  } else if (entry.mime.includes('woff2')) {
    ext = 'woff2';
    const fontMap = {
      '7e55c23f-59c5-4612-ad15-29cfa20e0ea8': 'SpaceGrotesk-Light',
      '844e1799-fec2-4f40-95db-f7a5ebfb3a0b': 'SpaceGrotesk-Light-Ext',
      'cb271446-b7e6-42ba-a3f1-ca482d68a314': 'SpaceGrotesk-Regular'
    };
    filename = (fontMap[uuid] || uuid) + '.woff2';
  }

  if (filename) {
    const dir = ext === 'svg' ? 'images' : 'fonts';
    const outPath = path.join(__dirname, dir, filename);
    fs.writeFileSync(outPath, finalBuf);
    console.log(`  Saved ${dir}/${filename} (${finalBuf.length} bytes)`);
  }
}

// 6. Extract content (nav to footer)
const navPos = realHtml.indexOf('<nav');
const footerClose = realHtml.indexOf('</footer>') + '</footer>'.length;
let content = realHtml.substring(navPos, footerClose);

// Clean escaped characters
content = content.replace(/\\"/g, '"');
content = content.replace(/\\n/g, '\n');
content = content.replace(/\\t/g, '\t');
content = content.replace(/<\\\//g, '</');

// Replace UUID image refs with file paths
content = content.replace(/199622af-7e1c-492b-b625-8dcfe2035f61/g, 'images/logo.svg');
content = content.replace(/99cc2d18-c0db-4944-86f7-aa9312b7e575/g, 'images/logo-footer.svg');

// Clean whitespace
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
console.log(`Content extracted: ${content.length} chars, ${content.split('<section').length - 1} sections`);

// 7. Extract CSS from the real HTML head
const headStart = realHtml.indexOf('<head>', 15000);
const headEnd = realHtml.indexOf('</head>', headStart);
const headContent = realHtml.substring(headStart + 6, headEnd);
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let cssBlocks = [];
while ((m = styleRegex.exec(headContent)) !== null) cssBlocks.push(m[1]);

// Skip first 2 style blocks (loader styles), keep fonts + main CSS
let css = cssBlocks.slice(2).join('\n\n');

// Replace UUID font paths
const fontReplacements = {
  '7e55c23f-59c5-4612-ad15-29cfa20e0ea8': 'fonts/SpaceGrotesk-Light.woff2',
  '844e1799-fec2-4f40-95db-f7a5ebfb3a0b': 'fonts/SpaceGrotesk-Light-Ext.woff2',
  'cb271446-b7e6-42ba-a3f1-ca482d68a314': 'fonts/SpaceGrotesk-Regular.woff2'
};
for (const [uuid, filePath] of Object.entries(fontReplacements)) {
  css = css.replace(new RegExp('url\(["\']?' + uuid.replace(/-/g, '\\-') + '["\']?\)', 'g'), `url('${filePath}')`);
}

fs.writeFileSync(path.join(__dirname, 'styles.css'), css);
console.log(`CSS saved: ${css.length} chars`);

// 8. Extract JS (after footer, the IIFE)
const afterFooter = realHtml.substring(footerClose);
const jsMatch = afterFooter.match(/<script>([\s\S]*?)<\/script>/);
let js = '';
if (jsMatch) {
  js = jsMatch[1];
  // Unescape JSON-encoded characters
  js = js.replace(/\\n/g, '\n');
  js = js.replace(/\\t/g, '\t');
  js = js.replace(/<\\\//g, '</');
  // Remove trailing junk
  js = js.replace(/<\/script>/g, '').replace(/<\/body>\s*<\/html>/g, '').replace(/"\s*$/, '').trim();
}
fs.writeFileSync(path.join(__dirname, 'js', 'main.js'), js);
console.log(`JS saved: ${js.length} chars`);

// 9. Build clean index.html
const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LAOS \u2014 Tecnologia para Pessoas Anal\u00f3gicas</title>
    <meta name="description" content="A Laos constr\u00f3i marcas, experi\u00eancias e sistemas para um futuro onde tecnologia amplifica a vida humana \u2014 e n\u00e3o compete com ela.">
    <meta name="keywords" content="LAOS, human technology, branding, IA, slow-tech, intelig\u00eancia cultural, creators, tecnologia humana">
    <meta property="og:title" content="LAOS \u2014 Tecnologia para Pessoas Anal\u00f3gicas">
    <meta property="og:description" content="A Laos constr\u00f3i marcas, experi\u00eancias e sistemas para um futuro onde tecnologia amplifica a vida humana.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://agencialaos.online">
    <link rel="icon" href="images/logo.svg" type="image/svg+xml">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

${content}

<script src="js/main.js"></script>
</body>
</html>`;

// 10. Replace old index.html and clean up
const oldIndex = fs.readFileSync(SRC, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'index.html.bak'), oldIndex);
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);

// Remove vercel.json if exists
const vercelPath = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelPath)) {
  fs.unlinkSync(vercelPath);
  console.log('Removed vercel.json');
}

console.log(`\n=== DONE ===`);
console.log(`index.html: ${indexHtml.length} chars (backup: index.html.bak)`);
console.log(`styles.css: ${css.length} chars`);
console.log(`js/main.js: ${js.length} chars`);
console.log(`images/: 2 SVG files`);
console.log(`fonts/: 3 woff2 files`);
console.log(`\nAgora execute:`);
console.log(`  git add -A`);
console.log(`  git commit -m "fix: site limpo sem bundler - funciona em mobile"`);
console.log(`  git push origin main`);

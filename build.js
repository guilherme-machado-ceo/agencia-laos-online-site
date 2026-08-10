const fs = require('fs');
const path = require('path');

// Pega o arquivo original que voce enviou (coloque o caminho certo)
const src = path.join('C:', 'Users', 'marca', 'Downloads', 'index (18).html');
let html = fs.readFileSync(src, 'utf-8');

// 1. Extrai CSS
const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
let css = styles.map(s => s.replace(/<style[^>]*>/, '').replace(/<\/style>/, '')).join('\n\n');
css = css.replace(/url\("7e55c23f-59c5-4612-ad15-29cfa20e0ea8"\)/g, "url('fonts/SpaceGrotesk-Light.woff2')");
css = css.replace(/url\("844e1799-fec2-4f40-95db-f7a5ebfb3a0b"\)/g, "url('fonts/SpaceGrotesk-Light-Ext.woff2')");
css = css.replace(/url\("cb271446-b7e6-42ba-a3f1-ca482d68a314"\)/g, "url('fonts/SpaceGrotesk-Regular.woff2')");
fs.writeFileSync('styles.css', css);
console.log('styles.css: ' + css.length + ' chars');

// 2. Extrai JS
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const js = scriptMatch ? scriptMatch[1].trim() : '';
fs.mkdirSync('js', { recursive: true });
fs.writeFileSync('js/main.js', js);
console.log('js/main.js: ' + js.length + ' chars');

// 3. Monta index.html limpo
let body = html;
body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
body = body.replace(/199622af-7e1c-492b-b625-8dcfe2035f61/g, 'images/logo.svg');
body = body.replace(/99cc2d18-c0db-4944-86f7-aa9312b7e575/g, 'images/logo-footer.svg');

const newHead =   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LAOS \u2014 Tecnologia para Pessoas Anal\u00f3gicas</title>
  <meta name="description" content="A Laos constr\u00f3i marcas, experi\u00eancias e sistemas para um futuro onde tecnologia amplifica a vida humana \u2014 e n\u00e3o compete com ela.">
  <meta name="keywords" content="LAOS, human technology, branding, IA, slow-tech, intelig\u00eancia cultural, creators, tecnologia humana">
  <meta property="og:title" content="LAOS \u2014 Tecnologia para Pessoas Anal\u00f3gicas">
  <meta property="og:description" content="A Laos constr\u00f3i marcas, experi\u00eancias e sistemas para um futuro onde tecnologia amplifica a vida humana.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://agencialaos.online">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link rel="stylesheet" href="styles.css">;

body = body.replace(/<head>[\s\S]*?<\/head>/, '<head>\n' + newHead + '\n</head>');
body = body.replace('</body>', '\n<script src="js/main.js"></script>\n</body>');
body = body.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('index.html', body);
console.log('index.html: ' + body.length + ' chars');
console.log('\n=== DONE ===');
console.log('Sem bundler: ' + (body.indexOf('__bundler') === -1));
console.log('CSS link: ' + body.includes('styles.css'));
console.log('JS link: ' + body.includes('js/main.js'));
console.log('Sections: ' + (body.match(/<section/g) || []).length);

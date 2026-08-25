const fs = require('fs');

// 读取所有文件
const html = fs.readFileSync('style-minimal-flat.html', 'utf8');
const mapCSS = fs.readFileSync('map-css-flat.txt', 'utf8');
const mapSection = fs.readFileSync('map-section-flat.txt', 'utf8');
const mapJS = fs.readFileSync('map-js-flat.txt', 'utf8');

const lines = html.split('\n');

// 1. 找到</style>位置，插入CSS
let styleEndIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '</style>') {
    styleEndIndex = i;
    break;
  }
}

if (styleEndIndex === -1) {
  console.error('找不到</style>标签');
  process.exit(1);
}

// 在</style>前插入CSS
lines.splice(styleEndIndex, 0, mapCSS);
console.log('✓ CSS已插入到行', styleEndIndex + 1);

// 2. 找到"Slide 3: 行业概述"，插入地图HTML
let slide3Index = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Slide 3: 行业概述') || lines[i].includes('Slide 3：行业概述')) {
    slide3Index = i;
    break;
  }
}

if (slide3Index === -1) {
  console.error('找不到Slide 3');
  process.exit(1);
}

lines.splice(slide3Index, 0, mapSection);
console.log('✓ 地图HTML已插入到行', slide3Index + 1);

// 3. 找到</body>，插入JS
let bodyEndIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '</body>') {
    bodyEndIndex = i;
    break;
  }
}

if (bodyEndIndex === -1) {
  console.error('找不到</body>标签');
  process.exit(1);
}

lines.splice(bodyEndIndex, 0, mapJS);
console.log('✓ JS已插入到行', bodyEndIndex + 1);

// 写入文件
fs.writeFileSync('style-minimal-flat.html', lines.join('\n'), 'utf8');

const finalSize = fs.statSync('style-minimal-flat.html').size;
console.log('✓ 集成完成，文件大小:', (finalSize / 1024).toFixed(0), 'KB');

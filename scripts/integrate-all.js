const fs = require('fs');

// 清理和集成函数
function integrateMap(htmlFile, sectionFile, cssFile, jsFile) {
  console.log(`\n=== 处理 ${htmlFile} ===`);

  let html = fs.readFileSync(htmlFile, 'utf8');
  let lines = html.split('\n');

  // 1. 删除CDN引用
  const cdnPatterns = ['cdn.jsdelivr', 'geo.datav.aliyun'];
  lines = lines.filter(line => !cdnPatterns.some(p => line.includes(p)));
  console.log('✓ 已删除CDN引用');

  // 2. 删除旧地图JS块（查找 function initChinaMapEcharts 或 initChinaMapEchartsDark 到其调用）
  let mapStart = -1, mapEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function initChinaMapEcharts')) mapStart = i;
    if (mapStart >= 0 && (lines[i].trim() === 'initChinaMapEcharts();' || lines[i].trim() === 'initChinaMapEchartsDark();')) {
      mapEnd = i;
      break;
    }
  }

  if (mapStart >= 0 && mapEnd >= 0) {
    lines = [...lines.slice(0, mapStart), ...lines.slice(mapEnd + 1)];
    console.log(`✓ 已删除旧地图JS (${mapEnd - mapStart + 1}行)`);
  }

  // 2b. 删除残留的旧地图代码片段（} else { console.warn... }）
  let orphanStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// ECharts 中国地图初始化') &&
        lines[i+1] && lines[i+1].trim() === '} else {' &&
        lines[i+2] && lines[i+2].includes('console.warn') &&
        lines[i+3] && lines[i+3].trim() === '}') {
      orphanStart = i;
      break;
    }
  }
  if (orphanStart >= 0) {
    lines = [...lines.slice(0, orphanStart), ...lines.slice(orphanStart + 4)];
    console.log(`✓ 已删除残留旧地图片段 (4行)`);
  }

  // 3. 删除旧地图HTML section（包含 id="chinaMapEcharts" 的section）
  let sectionStart = -1, sectionEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<section') && lines[i+1] && lines[i+1].includes('中国水表产业地图')) {
      sectionStart = i;
    }
    if (sectionStart >= 0 && lines[i].includes('</section>')) {
      sectionEnd = i;
      break;
    }
  }

  if (sectionStart >= 0 && sectionEnd >= 0) {
    lines = [...lines.slice(0, sectionStart), ...lines.slice(sectionEnd + 1)];
    console.log(`✓ 已删除旧地图HTML section (${sectionEnd - sectionStart + 1}行)`);
  }

  // 4. 读取新组件
  const mapCSS = fs.readFileSync(cssFile, 'utf8');
  const mapSection = fs.readFileSync(sectionFile, 'utf8');
  const mapJS = fs.readFileSync(jsFile, 'utf8');

  // 5. 插入CSS到</style>前
  let styleEndIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '</style>') {
      styleEndIndex = i;
      break;
    }
  }
  if (styleEndIndex >= 0) {
    lines.splice(styleEndIndex, 0, mapCSS);
    console.log('✓ CSS已插入');
  }

  // 6. 插入地图HTML到"Slide 3: 行业概述"前
  let slide3Index = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Slide 3') && (lines[i].includes('行业概述') || lines[i].includes('行业'))) {
      slide3Index = i;
      break;
    }
  }
  if (slide3Index >= 0) {
    lines.splice(slide3Index, 0, mapSection);
    console.log('✓ 地图HTML已插入');
  }

  // 7. 插入JS到</body>前
  let bodyEndIndex = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '</body>') {
      bodyEndIndex = i;
      break;
    }
  }
  if (bodyEndIndex >= 0) {
    lines.splice(bodyEndIndex, 0, mapJS);
    console.log('✓ JS已插入');
  }

  // 8. 写入文件
  fs.writeFileSync(htmlFile, lines.join('\n'), 'utf8');
  const size = (fs.statSync(htmlFile).size / 1024).toFixed(0);
  console.log(`✓ 完成，文件大小: ${size} KB`);
}

// 集成两个文件
integrateMap(
  'style-dark-tech.html',
  'components/map-section-dark.txt',
  'components/map-css-dark.txt',
  'components/map-js-dark.txt'
);

integrateMap(
  'style-minimal-flat.html',
  'components/map-section-flat.txt',
  'components/map-css-flat.txt',
  'components/map-js-flat.txt'
);

console.log('\n✅ 两个生产HTML文件已更新为最新数据：');
console.log('   - 8省份（山东、四川、重庆、浙江、河南、河北、江苏、江西）');
console.log('   - 23家企业（6+3+3+2+2+2+2+1）');

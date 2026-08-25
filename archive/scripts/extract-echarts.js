const fs = require('fs');

// 读取参考文件
const refFile = 'D:/Claude/mkt-NT26H-water_meter_research/参考资料/water-meter-map4.html';
const content = fs.readFileSync(refFile, 'utf8');

// 提取 <script> 标签内容（包含ECharts库和GeoJSON）
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
const echartsAndGeoJson = scriptMatch ? scriptMatch[1] : '';

// 确认提取成功
if (echartsAndGeoJson.length > 100000) {
  console.log('Successfully extracted ECharts and GeoJSON data');
  console.log('Size:', Math.round(echartsAndGeoJson.length / 1024), 'KB');

  // 保存到临时文件供后续使用
  fs.writeFileSync('D:/Claude/mkt-NT26H-water_meter_research/echarts-extracted.js', echartsAndGeoJson);
  console.log('Saved to echarts-extracted.js');
} else {
  console.error('Failed to extract data');
}

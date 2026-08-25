---
name: china-map-project
description: Generate and maintain embedded China province maps with ECharts
triggerPatterns:
  - china map
  - province map
  - echarts map
  - water meter map
---

# China Map Project Skill

Generate embedded, interactive China province maps using ECharts with no external dependencies.

## Project Structure Convention

**Root directory must only contain 2 production HTML files:**
- `style-dark-tech.html` — 深色科技风格
- `style-minimal-flat.html` — 简约扁平风格

**All other files organized into subdirectories:**

```
D:\Claude\mkt-NT26H-water_meter_research\
├── style-dark-tech.html          ← 生产文件
├── style-minimal-flat.html        ← 生产文件
├── .gitignore
├── scripts/                       ← 生成脚本
│   ├── build-map.js              (原型生成)
│   ├── generate-dark-map.js      (深色组件生成)
│   ├── generate-flat-map.js      (扁平组件生成)
│   └── integrate-flat-map.js     (集成脚本)
├── components/                    ← 地图组件片段
│   ├── map-section-dark.txt      (HTML片段)
│   ├── map-css-dark.txt          (CSS片段)
│   ├── map-js-dark.txt           (JS+库)
│   ├── map-section-flat.txt
│   ├── map-css-flat.txt
│   ├── map-js-flat.txt
│   └── map-extracted-parts.json
├── archive/                       ← 原型与临时文件
│   ├── temp_html/
│   │   └── test-map.html         (测试原型)
│   ├── extracted_resources/
│   │   └── china-geo-clean.json  (清洁GeoJSON)
│   └── scripts/
├── map/                           ← ECharts源码
│   └── echarts-master/
├── ChinaGeoJson/                  ← GeoJSON源数据
├── picture/                       ← 图片资源
└── 参考资料/                      ← 文档资料
```

## File Organization Rules

1. **Production HTML only at root** — 只有2个正式HTML在根目录
2. **Scripts in scripts/** — 所有.js生成脚本放到scripts/
3. **Components in components/** — 生成的组件片段放到components/
4. **Prototypes in archive/** — 测试原型放到archive/temp_html/
5. **No scattered files** — 根目录保持清爽

## GeoJSON Extraction Fix

**Critical Bug**: 直接使用 regex 清理 GeoJSON 会混入多余 JS 语句导致空白地图。

**Root Cause**: 
`geojson-extracted.js` 包含多条语句：
```javascript
const chinaGeoJson = {...};
const colors = {...};
let currentProvince = '山东';
```

简单 `.replace(/;\s*$/, '')` 只删除最后一个分号，JSON.parse 在位置 340259 失败。

**Correct Fix**:
```javascript
const fs = require('fs');
const geoCode = fs.readFileSync('geojson-extracted.js', 'utf8');

// 使用 Function 沙箱提取纯对象
const sandbox = {};
new Function('sandbox', geoCode + '; sandbox.geo = chinaGeoJson;')(sandbox);

// 生成清洁JSON
const cleanJson = JSON.stringify(sandbox.geo, null, 2);
fs.writeFileSync('archive/extracted_resources/china-geo-clean.json', cleanJson);

// 验证
JSON.parse(cleanJson); // 必须通过
```

**Output**: `archive/extracted_resources/china-geo-clean.json` (332 KB, 34省)

## Map Generation Workflow

### 1. 原型开发 (build-map.js → test-map.html)

```bash
node scripts/build-map.js
```

生成 `archive/temp_html/test-map.html`，嵌入：
- ECharts 库 (1095 KB)
- China GeoJSON (332 KB)
- 8省数据 + 19企业

**验证清单**:
- [ ] 地图正常渲染（非空白）
- [ ] 8省显示正确颜色
- [ ] 悬停/选中高亮正常
- [ ] 点击显示企业信息
- [ ] 非关键省不显示标签
- [ ] 企业卡片隐藏城市名 (`.company-city { display: none; }`)

### 2. 生成风格化组件

**深色科技风格**:
```bash
node scripts/generate-dark-map.js
```
输出到 `components/`:
- `map-section-dark.txt` — HTML结构
- `map-css-dark.txt` — 深色主题CSS
- `map-js-dark.txt` — ECharts库 + 地图逻辑

**简约扁平风格**:
```bash
node scripts/generate-flat-map.js
```
输出到 `components/`:
- `map-section-flat.txt` — HTML结构
- `map-css-flat.txt` — 扁平主题CSS
- `map-js-flat.txt` — ECharts库 + 地图逻辑

### 3. 集成到生产HTML

**清理旧代码** → **插入新组件**:

```javascript
// 1. 删除CDN引用（如果存在）
// 2. 删除旧地图JS代码块
// 3. 插入CSS到</style>前
// 4. 插入HTML到"Slide 3: 行业概述"前
// 5. 插入JS+库到</body>前
```

**Critical**: 确保 `<script>` 标签匹配，否则导航翻页失效。

## Common Pitfalls

### 1. Script Tag Mismatch
**Symptom**: 翻页失效，键盘导航不工作
**Cause**: 缺失 `</script>` 或新 `<script>` 在旧脚本块内打开
**Fix**: 检查每个 `<script>` 都有对应 `</script>`

### 2. Old Map Code Remnants
**Symptom**: JavaScript 语法错误，控制台报错
**Cause**: 清理旧地图代码不完整（`} else {` 等残留）
**Fix**: 完整删除旧地图函数和调用

### 3. ECharts Library Missing
**Symptom**: 地图容器为空，控制台报 `echarts is not defined`
**Cause**: 生成脚本未在 `mapJS` 模板中嵌入 `${echarts}`
**Fix**: 模板字符串开头添加 `<script>\n${echarts}\n\n`

### 4. GeoJSON Mixed with JS
**Symptom**: 空白地图，JSON.parse 失败
**Cause**: 使用 regex 提取 GeoJSON 混入其他语句
**Fix**: 使用 Function 沙箱提取（见上文）

## Verification Checklist

生成/集成后必须验证：
- [ ] 双击HTML直接打开（无外部依赖）
- [ ] 8省正确显示各自颜色
- [ ] 悬停显示省份标签+边框高亮
- [ ] 点击显示企业列表面板
- [ ] 非关键省不显示标签
- [ ] 企业卡片无城市名显示
- [ ] 键盘方向键可翻页（导航未破坏）
- [ ] 文件大小 ~1.4-1.5 MB（含ECharts库）

## Update Constraint

⚠️ **重要约束**: 地图只能在 `style-dark-tech.html` 和 `style-minimal-flat.html` 中更新。

如需新建HTML用于测试，必须先向用户确认！

## Resources

- ECharts 源码: `map/echarts-master/dist/echarts.min.js` (1095 KB)
- GeoJSON 数据: `archive/extracted_resources/china-geo-clean.json` (332 KB)
- 省份数据: 8省 × 19企业，内嵌在生成脚本中

## Backup & Version Control

```bash
git add style-dark-tech.html style-minimal-flat.html scripts/ components/
git commit -m "更新地图功能"
git push origin main
```

`.gitignore` 排除大型资源库：
```
map/echarts-master/
map/ChinaGeoJson-master/
*.zip
```

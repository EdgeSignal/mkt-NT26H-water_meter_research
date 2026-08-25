const fs = require('fs');

// 读取提取的ECharts库和GeoJSON数据
const echartsLib = fs.readFileSync('D:/Claude/mkt-NT26H-water_meter_research/echarts-extracted.js', 'utf8');
const geoJsonCode = fs.readFileSync('D:/Claude/mkt-NT26H-water_meter_research/geojson-extracted.js', 'utf8');

// 省份数据
const provinceData = {
  '山东': {
    level: '核心集聚区',
    levelLabel: '核心集聚区',
    color: '#3a6ff7',
    summary: '内部CRM与客户访谈均显示企业密集，是本次材料中证据最集中的省份。',
    signals: ['多家表厂与方案商', 'Cat.1项目活跃', '运营商省库影响明显'],
    companies: [
      { name: '济南瑞泉电子有限公司', city: '济南', tags: ['电子远传', '物联网水表', '方案平台'] },
      { name: '山东科德电子有限公司', city: '泰安', tags: ['预付费水表', '物联网水表', '远传水表'] },
      { name: '泰安轻松表计有限公司', city: '泰安', tags: ['智能水表', '远传表', '表计系统'] },
      { name: '威海市天罡仪表股份有限公司', city: '威海', tags: ['超声波水表', '智慧水务', '物联网终端'] }
    ]
  },
  '浙江': {
    level: '重点集聚区',
    levelLabel: '重点集聚区',
    color: '#24b7d9',
    summary: '宁波、杭州、温州形成多类型水表企业节点，兼具传统水表与智能化能力。',
    signals: ['宁波头部整表厂', '传统与智能并存', '温州仪表产业带'],
    companies: [
      { name: '宁波水表（集团）股份有限公司', city: '宁波', tags: ['机械水表', '智能水表', '远传水表'] },
      { name: '杭州水表有限公司', city: '杭州', tags: ['水计量', '超声波水表', '智慧水务'] },
      { name: '浙江正泰仪器仪表有限责任公司', city: '温州·乐清', tags: ['水表', '智能计量', '仪表制造'] }
    ]
  },
  '四川': {
    level: '重点集聚区',
    levelLabel: '重点集聚区',
    color: '#24b7d9',
    summary: '成都及周边形成水表整机、智慧水务与远程抄表企业群，是材料中被明确提及的西南水表基地。',
    signals: ['成都水表企业群', '摄像表项目', '整机与平台并存'],
    companies: [
      { name: '成都汇锦智慧科技有限公司', city: '成都·郫都', tags: ['水表整机', '摄像水表', '智慧水务'] },
      { name: '四川府星仪表有限公司', city: '成都·新津', tags: ['水表整机', '物联网水表', '超声波水表'] },
      { name: '成都华信万通科技有限公司', city: '成都', tags: ['智能水表', '远程抄表', '预付费'] },
      { name: '成都市三宇仪表科技发展有限公司', city: '成都', tags: ['水表整机', '光电远传', '预付费'] }
    ]
  },
  '重庆': {
    level: '方案与企业节点',
    levelLabel: '方案与企业节点',
    color: '#43c59e',
    summary: 'CRM中水表相关客户和摄像直读方案记录较集中，兼具整机厂与智慧水务方案商。',
    signals: ['摄像直读水表', '智慧水务方案', 'CRM客户线索'],
    companies: [
      { name: '重庆信驰科技有限公司', city: '重庆', tags: ['方案商', '摄像直读', '远传抄表'] },
      { name: '重庆西美仪器仪表有限公司', city: '重庆', tags: ['CRM客户', '仪表厂家', '待筛选'] },
      { name: '重庆智慧水务有限公司', city: '重庆', tags: ['水表整机', '物联网水表', '智慧水务'] },
      { name: '重庆泓美仪表有限责任公司', city: '重庆', tags: ['水表整机', '物联网水表', '远传水表'] }
    ]
  },
  '江西': {
    level: '龙头企业节点',
    levelLabel: '龙头企业节点',
    color: '#43c59e',
    summary: '以鹰潭三川智慧为代表，具备大规模智能水表与物联网产品能力。',
    signals: ['头部整表企业', 'NB-IoT基本盘', '摄像表增量方向'],
    companies: [
      { name: '三川智慧科技股份有限公司', city: '鹰潭', tags: ['智能水表', '物联网水表', '智慧水务'] }
    ]
  },
  '河南': {
    level: '龙头企业节点',
    levelLabel: '龙头企业节点',
    color: '#43c59e',
    summary: '以郑州新天科技为代表，覆盖智能水表、智慧水务和多类智能表。',
    signals: ['智能表综合企业', '智慧水务平台', 'Cat.1项目案例'],
    companies: [
      { name: '新天科技股份有限公司', city: '郑州', tags: ['智能水表', '智慧水务', '物联终端'] }
    ]
  },
  '河北': {
    level: '龙头企业节点',
    levelLabel: '龙头企业节点',
    color: '#43c59e',
    summary: '以唐山汇中仪表为代表，超声测流与智能水表方向具有辨识度。',
    signals: ['超声水表', '智慧管理系统', '北方项目场景'],
    companies: [
      { name: '汇中仪表股份有限公司', city: '唐山', tags: ['超声水表', '超声流量计', '智慧系统'] }
    ]
  },
  '江苏': {
    level: '龙头企业节点',
    levelLabel: '龙头企业节点',
    color: '#43c59e',
    summary: '以南京迈拓仪表为代表，聚焦智能超声水表与智慧水务解决方案。',
    signals: ['智能超声水表', '上市公司', '软硬件一体化'],
    companies: [
      { name: '迈拓仪表股份有限公司', city: '南京', tags: ['超声水表', '智能控制阀', '智慧水务'] }
    ]
  }
};

const colors = {
  '核心集聚区': '#3a6ff7',
  '重点集聚区': '#24b7d9',
  '龙头企业节点': '#43c59e',
  '方案与企业节点': '#43c59e'
};

// 生成完整HTML
const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>中国智能水表产业重点区域分布</title>
  <style>
    :root {
      --navy: #071529;
      --navy-2: #0a1e37;
      --panel: rgba(13, 34, 59, .88);
      --line: rgba(157, 190, 223, .17);
      --text: #f6f9fd;
      --muted: #91a8c1;
      --blue: #3a6ff7;
      --cyan: #24b7d9;
      --green: #43c59e;
      --orange: #ffb24a;
      --selected: #ff9e3f;
    }
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
    body {
      font-family: Inter, "Microsoft YaHei", "PingFang SC", system-ui, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 18% 12%, rgba(42, 105, 230, .18), transparent 28%),
        radial-gradient(circle at 82% 82%, rgba(31, 191, 166, .09), transparent 24%),
        linear-gradient(135deg, var(--navy), #061120 62%, #08182b);
    }
    body::before {
      content: "";
      position: fixed; inset: 0; pointer-events: none;
      background-image: linear-gradient(rgba(121, 162, 205, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(121, 162, 205, .035) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: linear-gradient(to bottom, black, transparent 85%);
    }
    .slide {
      width: 100vw; height: 100vh; min-height: 620px;
      display: grid; grid-template-rows: auto minmax(0, 1fr) auto;
      padding: clamp(24px, 3.1vw, 60px) clamp(28px, 4.2vw, 82px) clamp(18px, 2vw, 38px);
      position: relative;
    }
    header { display: flex; align-items: flex-start; justify-content: space-between; gap: 28px; }
    .eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #78d8e8; font-size: 13px; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
    .eyebrow::before { content: ""; width: 28px; height: 2px; background: linear-gradient(90deg, var(--cyan), var(--green)); }
    h1 { margin: 0; font-size: clamp(30px, 3vw, 56px); line-height: 1.08; letter-spacing: -.035em; font-weight: 760; }
    .subtitle { margin: 12px 0 0; color: var(--muted); font-size: clamp(13px, 1.05vw, 18px); }
    .scope-badge { flex: 0 0 auto; margin-top: 4px; padding: 11px 15px; border: 1px solid rgba(78, 164, 229, .25); border-radius: 999px; background: rgba(8, 32, 57, .72); color: #b9d2e8; font-size: 12px; white-space: nowrap; }
    .scope-badge b { color: #fff; font-size: 14px; margin-right: 8px; }
    .content { min-height: 0; display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(330px, .85fr); gap: clamp(18px, 2.2vw, 42px); padding-top: clamp(16px, 2vh, 30px); }
    .map-shell, .detail-panel { min-height: 0; border: 1px solid var(--line); border-radius: 26px; background: linear-gradient(145deg, rgba(14, 40, 69, .68), rgba(6, 20, 37, .56)); box-shadow: 0 24px 80px rgba(0, 0, 0, .2); }
    .map-shell { position: relative; overflow: hidden; }
    #map { position: absolute; inset: 0 0 54px 0; }
    .map-topline { position: absolute; left: 22px; top: 18px; z-index: 2; display: flex; align-items: center; gap: 8px; color: #a7bdd3; font-size: 12px; pointer-events: none; }
    .pulse { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 0 rgba(67, 197, 158, .5); animation: pulse 2.2s infinite; }
    @keyframes pulse { 70% { box-shadow: 0 0 0 10px rgba(67, 197, 158, 0); } 100% { box-shadow: 0 0 0 0 rgba(67, 197, 158, 0); } }
    .province-nav { position: absolute; left: 18px; right: 18px; bottom: 14px; z-index: 3; display: flex; justify-content: center; flex-wrap: wrap; gap: 7px; }
    .province-btn { appearance: none; border: 1px solid rgba(129, 171, 210, .18); color: #a8bdd2; background: rgba(9, 28, 49, .9); border-radius: 999px; padding: 7px 12px; font: inherit; font-size: 12px; cursor: pointer; transition: .22s ease; }
    .province-btn:hover, .province-btn:focus-visible { color: #fff; border-color: rgba(88, 180, 232, .62); transform: translateY(-1px); outline: none; }
    .province-btn.active { color: #fff; border-color: transparent; background: linear-gradient(100deg, var(--blue), #398fd4); box-shadow: 0 8px 24px rgba(58, 111, 247, .28); }
    .detail-panel { padding: clamp(20px, 2vw, 34px); overflow: auto; position: relative; scrollbar-width: thin; scrollbar-color: rgba(117, 160, 201, .34) transparent; }
    .detail-panel::after { content: ""; position: absolute; right: 0; top: 0; width: 120px; height: 120px; border-radius: 0 26px 0 100%; background: linear-gradient(135deg, transparent, rgba(53, 126, 221, .09)); pointer-events: none; }
    .panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .province-name { margin: 0; font-size: clamp(27px, 2vw, 38px); letter-spacing: -.04em; }
    .level-pill { border-radius: 999px; padding: 7px 11px; font-size: 11px; font-weight: 700; color: #08182b; background: var(--active-color, var(--blue)); white-space: nowrap; }
    .panel-summary { margin: 13px 0 16px; color: #b0c2d4; font-size: 13px; line-height: 1.7; }
    .signal-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 17px; }
    .signal { padding: 6px 9px; border: 1px solid rgba(122, 169, 207, .16); border-radius: 7px; background: rgba(17, 45, 73, .52); color: #8fb2cf; font-size: 11px; }
    .company-title { display: flex; align-items: center; justify-content: space-between; margin: 0 0 9px; color: #dce8f4; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .company-title span { color: var(--active-color, var(--blue)); font-size: 18px; letter-spacing: 0; }
    .companies { display: grid; gap: 9px; }
    .company-card { padding: 13px 14px; border: 1px solid rgba(130, 169, 204, .13); border-radius: 13px; background: rgba(5, 20, 37, .55); transition: transform .2s ease, border-color .2s ease, background .2s ease; }
    .company-card:hover { transform: translateX(3px); border-color: color-mix(in srgb, var(--active-color) 48%, transparent); background: rgba(13, 38, 63, .78); }
    .company-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
    .company-name { margin: 0; font-size: 14px; line-height: 1.35; }
    .city { color: #7895af; font-size: 11px; white-space: nowrap; }
    .tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; }
    .tag { padding: 3px 6px; border-radius: 5px; color: #93cae3; background: rgba(44, 133, 179, .12); font-size: 10px; }
    .panel-flash { animation: panelFlash .32s ease both; }
    @keyframes panelFlash { from { opacity: .42; transform: translateY(5px); } to { opacity: 1; transform: none; } }
    footer { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end; padding-top: 13px; color: #657f99; font-size: 10px; line-height: 1.55; }
    .legend { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
    .legend b { color: #91a8c1; }
    .legend-item { display: inline-flex; align-items: center; gap: 5px; }
    .dot { width: 8px; height: 8px; border-radius: 2px; }
    .method { max-width: 710px; }
    .date { text-align: right; white-space: nowrap; }
    @media (max-width: 900px) {
      html, body { overflow: auto; }
      .slide { height: auto; min-height: 100vh; }
      header { display: block; }
      .scope-badge { display: inline-block; margin-top: 14px; }
      .content { grid-template-columns: 1fr; }
      .map-shell { min-height: 540px; }
      .detail-panel { min-height: 420px; }
      footer { grid-template-columns: 1fr; }
      .date { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="slide">
    <header>
      <div>
        <div class="eyebrow">Market Landscape · China</div>
        <h1>中国智能水表产业重点区域分布</h1>
        <p class="subtitle">以企业所在地为视角，识别海思 Cat.1 水表市场的重点触达区域</p>
      </div>
      <div class="scope-badge"><b>8</b>个重点省级区域 · <b>19</b>家代表企业</div>
    </header>

    <section class="content">
      <div class="map-shell">
        <div class="map-topline"><span class="pulse"></span>悬浮查看摘要 · 点击区域或标记展开厂家</div>
        <div id="map" role="img" aria-label="中国智能水表产业重点区域交互地图"></div>
        <nav class="province-nav" aria-label="重点省份快速切换" id="provinceNav"></nav>
      </div>

      <aside class="detail-panel" id="detailPanel" aria-live="polite"></aside>
    </section>

    <footer>
      <div>
        <div class="legend">
          <b>颜色图例</b>
          <span class="legend-item"><span class="dot" style="background:#3a6ff7"></span>核心集聚区</span>
          <span class="legend-item"><span class="dot" style="background:#24b7d9"></span>重点集聚区</span>
          <span class="legend-item"><span class="dot" style="background:#43c59e"></span>龙头企业节点</span>
          <span class="legend-item"><span class="dot" style="background:#263b52"></span>其他省份</span>
        </div>
        <div class="method">口径：CRM出现作为初筛纳入标准，客户访谈与企业公开信息用于补充判断。颜色表达本次材料中的产业集聚或代表性，不代表市场份额、安装量或最终厂家白名单，后续可继续人工筛选。</div>
      </div>
      <div class="date">资料周期 2024—2026<br>公开信息核验 2026.08.25</div>
    </footer>
  </div>

  <script>
${echartsLib}
  </script>
  <script>
${geoJsonCode}

// 注册地图
echarts.registerMap('china-water-meter', chinaGeoJson);

// 省份数据
const provinceData = ${JSON.stringify(provinceData, null, 2)};

const colors = ${JSON.stringify(colors, null, 2)};

// 当前选中省份
let currentProvince = '山东';

// 准备地图数据 - 完全参考working版本的数据结构
const mapSeriesData = Object.keys(provinceData).map(name => ({
  name: name,
  value: provinceData[name].companies.length,
  itemStyle: {
    areaColor: provinceData[name].color,
    borderColor: '#7793ad',
    borderWidth: 0.7
  }
  // 注意：不在数据项级别设置label，让series级别的emphasis/select控制标签显示
}));

// 初始化地图
const chart = echarts.init(document.getElementById('map'));

chart.setOption({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(13, 34, 59, .95)',
    borderColor: 'rgba(88, 180, 232, .5)',
    borderWidth: 1,
    padding: [10, 12],
    textStyle: { color: '#eaf4ff', fontFamily: 'Microsoft YaHei', fontSize: 12 },
    extraCssText: 'border-radius:10px;box-shadow:0 12px 34px rgba(0,0,0,.35)',
    formatter: (params) => {
      const info = provinceData[params.name];
      if (!info) return '';
      return '<b style="font-size:14px">' + params.name + '</b> · ' + info.levelLabel + '<br/><span style="color:#9db5ca">本页列示 ' + info.companies.length + ' 家代表企业</span><br/><span style="color:#69d2e7">点击查看厂家 →</span>';
    }
  },
  geo: {
    map: 'china-water-meter',
    roam: false,
    silent: true,
    layoutCenter: ['49%', '51%'],
    layoutSize: '94%',
    itemStyle: { areaColor: '#263b52', borderColor: '#6f8ca8', borderWidth: .65 },
    label: { show: false }
  },
  series: [{
    type: 'map',
    map: 'china-water-meter',
    selectedMode: 'single',
    layoutCenter: ['49%', '51%'],
    layoutSize: '94%',
    data: mapSeriesData,
    label: { show: false },
    itemStyle: { areaColor: '#263b52', borderColor: '#7793ad', borderWidth: .7 },
    emphasis: {
      label: { show: true, color: '#ffffff', fontSize: 13, fontWeight: 700 },
      itemStyle: { areaColor: '#ffb24a', borderColor: '#ffe4ad', borderWidth: 1.5, shadowBlur: 24, shadowColor: 'rgba(255,178,74,.42)' }
    },
    select: {
      label: { show: true, color: '#ffffff', fontSize: 13, fontWeight: 800 },
      itemStyle: { areaColor: '#ff9e3f', borderColor: '#fff0cf', borderWidth: 1.7, shadowBlur: 28, shadowColor: 'rgba(255,158,63,.5)' }
    }
  }, {
    name: '重庆辅助点击标记',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 5,
    showEffectOn: 'render',
    rippleEffect: { scale: 4, brushType: 'stroke' },
    symbolSize: 15,
    data: [{ name: '重庆', value: [106.55, 29.56, 1] }],
    itemStyle: { color: '#ffb24a', shadowBlur: 16, shadowColor: 'rgba(255,178,74,.75)' },
    label: { show: true, formatter: '重庆', position: 'right', color: '#ffffff', fontSize: 12, fontWeight: 700 }
  }]
});

const panel = document.getElementById('detailPanel');
const nav = document.getElementById('provinceNav');

function renderPanel(name) {
  const info = provinceData[name];
  if (!info) return;
  currentProvince = name;
  panel.style.setProperty('--active-color', colors[info.level]);
  panel.classList.remove('panel-flash');
  void panel.offsetWidth;
  panel.classList.add('panel-flash');
  panel.innerHTML =         '<div class="panel-head"><h2 class="province-name">' + name + '</h2><span class="level-pill">' + info.levelLabel + '</span></div>' +
    '<p class="panel-summary">' + info.summary + '</p>' +
    '<div class="signal-row">' + info.signals.map(s => '<span class="signal">' + s + '</span>').join('') + '</div>' +
    '<div class="company-title">代表厂家 <span>' + String(info.companies.length).padStart(2, '0') + '</span></div>' +
    '<div class="companies">' + info.companies.map(c =>
      '<article class="company-card"><div class="company-top"><h3 class="company-name">' + c.name + '</h3><span class="city">' + c.city + '</span></div>' +
      '<div class="tags">' + c.tags.map(t => '<span class="tag">' + t + '</span>').join('') + '</div></article>'
    ).join('') + '</div>';
  [...nav.children].forEach(btn => btn.classList.toggle('active', btn.dataset.province === name));
}

Object.keys(provinceData).forEach((name) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'province-btn';
  btn.dataset.province = name;
  btn.textContent = name;
  btn.addEventListener('click', () => selectProvince(name));
  nav.appendChild(btn);
});

function selectProvince(name) {
  if (!provinceData[name]) return;
  chart.dispatchAction({ type: 'unselect', name: currentProvince });
  chart.dispatchAction({ type: 'select', name });
  renderPanel(name);
}

chart.on('click', (params) => {
  if (provinceData[params.name]) selectProvince(params.name);
  else chart.dispatchAction({ type: 'select', name: currentProvince });
});

window.addEventListener('resize', () => chart.resize());
renderPanel(currentProvince);
chart.dispatchAction({ type: 'select', name: currentProvince });
  </script>
</body>
</html>`;

// 写入完整HTML文件
fs.writeFileSync('D:/Claude/mkt-NT26H-water_meter_research/china-water-meter-map-complete.html', html);
console.log('Complete HTML file generated successfully!');
console.log('File: china-water-meter-map-complete.html');
console.log('Size:', Math.round(html.length / 1024), 'KB');

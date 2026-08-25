const fs = require('fs');

// 读取资源
const echarts = fs.readFileSync('map/echarts-master/dist/echarts.min.js', 'utf8');
// 使用纯净的GeoJSON（已验证可被JSON.parse）
const geoJson = fs.readFileSync('archive/extracted_resources/china-geo-clean.json', 'utf8');

// 省份数据
const provinceData = {
  '山东': {
    color: '#3a6ff7',
    level: '核心集聚区',
    summary: '内部CRM与客户访谈均显示企业密集，是本次材料中证据最集中的省份。',
    companies: [
      { name: '济南瑞泉电子有限公司', city: '济南', tags: ['电子远传', '物联网水表', '方案平台'] },
      { name: '山东科德电子有限公司', city: '泰安', tags: ['预付费水表', '物联网水表', '远传水表'] },
      { name: '泰安轻松表计有限公司', city: '泰安', tags: ['智能水表', '远传表', '表计系统'] },
      { name: '威海市天罡仪表股份有限公司', city: '威海', tags: ['超声波水表', '智慧水务', '物联网终端'] }
    ]
  },
  '浙江': {
    color: '#24b7d9',
    level: '重点集聚区',
    summary: '宁波、杭州、温州形成多类型水表企业节点，兼具传统水表与智能化能力。',
    companies: [
      { name: '宁波水表（集团）股份有限公司', city: '宁波', tags: ['机械水表', '智能水表', '远传水表'] },
      { name: '杭州水表有限公司', city: '杭州', tags: ['水计量', '超声波水表', '智慧水务'] },
      { name: '浙江正泰仪器仪表有限责任公司', city: '温州·乐清', tags: ['水表', '智能计量', '仪表制造'] }
    ]
  },
  '四川': {
    color: '#24b7d9',
    level: '重点集聚区',
    summary: '成都及周边形成水表整机、智慧水务与远程抄表企业群，是材料中被明确提及的西南水表基地。',
    companies: [
      { name: '成都汇锦智慧科技有限公司', city: '成都·郫都', tags: ['水表整机', '摄像水表', '智慧水务'] },
      { name: '四川府星仪表有限公司', city: '成都·新津', tags: ['水表整机', '物联网水表', '超声波水表'] },
      { name: '成都华信万通科技有限公司', city: '成都', tags: ['智能水表', '远程抄表', '预付费'] },
      { name: '成都市三宇仪表科技发展有限公司', city: '成都', tags: ['水表整机', '光电远传', '预付费'] }
    ]
  },
  '重庆': {
    color: '#43c59e',
    level: '企业节点',
    summary: 'CRM中水表相关客户和摄像直读方案记录较集中，兼具整机厂与智慧水务方案商。',
    companies: [
      { name: '重庆信驰科技有限公司', city: '重庆', tags: ['方案商', '摄像直读', '远传抄表'] },
      { name: '重庆西美仪器仪表有限公司', city: '重庆', tags: ['CRM客户', '仪表厂家', '待筛选'] },
      { name: '重庆智慧水务有限公司', city: '重庆', tags: ['水表整机', '物联网水表', '智慧水务'] }
    ]
  },
  '江西': {
    color: '#43c59e',
    level: '企业节点',
    summary: '江西省CRM与行业材料中出现多次，具备一定产业基础和市场触达价值。',
    companies: [
      { name: '江西三川智慧科技股份有限公司', city: '鹰潭', tags: ['NB-IoT水表', '智慧水务', '物联网'] }
    ]
  },
  '河南': {
    color: '#43c59e',
    level: '企业节点',
    summary: '河南省在CRM中有明确客户线索，且公开信息显示本地有物联网水表制造能力。',
    companies: [
      { name: '河南许昌金科资源再生股份有限公司', city: '许昌', tags: ['智能水表', '节水设备'] },
      { name: '新乡市恒达表计有限公司', city: '新乡', tags: ['远传水表', '智能计量'] }
    ]
  },
  '河北': {
    color: '#43c59e',
    level: '企业节点',
    summary: '河北省CRM记录显示本地有智能水表企业，且地理位置靠近京津市场。',
    companies: [
      { name: '河北汇中仪表股份有限公司', city: '石家庄', tags: ['热量表', '智能水表', '物联网'] },
      { name: '唐山汇中仪表股份有限公司', city: '唐山', tags: ['远传水表', '智慧计量'] }
    ]
  },
  '江苏': {
    color: '#43c59e',
    level: '企业节点',
    summary: '江苏省产业配套完善，CRM中有多家水表企业线索，且地理位置便于长三角市场覆盖。',
    companies: [
      { name: '江苏赛达电子科技有限公司', city: '常州', tags: ['物联网水表', 'NB-IoT', '智能抄表'] }
    ]
  }
};

// 生成HTML
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>中国智能水表产业地图</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 100vw; height: 100vh;
      background: linear-gradient(135deg, #0a1628 0%, #061120 100%);
      overflow: hidden;
      font-family: 'Microsoft YaHei', Arial, sans-serif;
    }
    .container {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 20px;
      height: 100vh;
      padding: 20px;
    }
    #map {
      width: 100%; height: 100%;
      background: rgba(14, 40, 69, 0.3);
      border-radius: 15px;
      border: 1px solid rgba(58, 111, 247, 0.2);
    }
    .panel {
      background: rgba(14, 40, 69, 0.5);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(58, 111, 247, 0.2);
      border-radius: 15px;
      padding: 30px;
      overflow-y: auto;
      color: #e0e7f1;
    }
    .panel h2 {
      color: #3a6ff7;
      margin-bottom: 20px;
      font-size: 24px;
    }
    .province-name {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 10px;
    }
    .level-badge {
      display: inline-block;
      background: #3a6ff7;
      color: #fff;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .summary {
      color: #b0c2d4;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    .company-title {
      color: #3a6ff7;
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0 15px;
    }
    .company {
      background: rgba(5, 20, 37, 0.6);
      border: 1px solid rgba(58, 111, 247, 0.15);
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 12px;
      transition: all 0.3s;
    }
    .company:hover {
      border-color: rgba(58, 111, 247, 0.5);
      transform: translateX(5px);
    }
    .company-name {
      font-size: 15px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 5px;
    }
    .company-city {
      color: #7895af;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .tag {
      background: rgba(58, 111, 247, 0.2);
      color: #93cae3;
      padding: 3px 8px;
      border-radius: 5px;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="map"></div>
    <div class="panel" id="panel">
      <h2>省份详情</h2>
      <p style="color: #808080;">点击地图上的重点省份查看详情</p>
    </div>
  </div>

  <script>
${echarts}
  </script>

  <script>
const chinaGeoJson = ${geoJson};
echarts.registerMap('china', chinaGeoJson);

const provinceData = ${JSON.stringify(provinceData, null, 2)};

const mapData = Object.keys(provinceData).map(name => ({
  name: name,
  itemStyle: { areaColor: provinceData[name].color }
}));

const chart = echarts.init(document.getElementById('map'));

chart.setOption({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(13, 34, 59, 0.95)',
    borderColor: 'rgba(58, 111, 247, 0.5)',
    borderWidth: 1,
    padding: [10, 15],
    textStyle: { color: '#eaf4ff', fontSize: 13 },
    formatter: (params) => {
      const info = provinceData[params.name];
      if (!info) return '';
      return '<b style="font-size:15px">' + params.name + '</b><br/>' +
             '<span style="color:#9db5ca">' + info.level + ' · ' + info.companies.length + '家企业</span><br/>' +
             '<span style="color:#69d2e7">点击查看详情 →</span>';
    }
  },
  series: [{
    type: 'map',
    map: 'china',
    roam: false,
    selectedMode: 'single',
    data: mapData,
    itemStyle: {
      areaColor: '#1a2744',
      borderColor: '#3a5a7f',
      borderWidth: 1
    },
    emphasis: {
      itemStyle: {
        areaColor: '#ffb24a',
        borderColor: '#ffe4ad',
        borderWidth: 1.5
      },
      label: {
        show: true,
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    select: {
      itemStyle: {
        areaColor: '#ff9e3f',
        borderColor: '#fff0cf',
        borderWidth: 2
      },
      label: {
        show: true,
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    label: { show: false }
  }]
});

function renderPanel(name) {
  const info = provinceData[name];
  if (!info) return;

  const panel = document.getElementById('panel');
  panel.innerHTML =
    '<div class="province-name">' + name + '</div>' +
    '<span class="level-badge">' + info.level + '</span>' +
    '<div class="summary">' + info.summary + '</div>' +
    '<div class="company-title">代表企业 (' + info.companies.length + ')</div>' +
    info.companies.map(c =>
      '<div class="company">' +
        '<div class="company-name">' + c.name + '</div>' +
        '<div class="company-city">' + c.city + '</div>' +
        '<div class="tags">' + c.tags.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>' +
      '</div>'
    ).join('');
}

chart.on('click', (params) => {
  if (provinceData[params.name]) {
    renderPanel(params.name);
  }
});

renderPanel('山东');
chart.dispatchAction({ type: 'select', name: '山东' });

window.addEventListener('resize', () => chart.resize());
  </script>
</body>
</html>`;

fs.writeFileSync('test-map.html', html);
console.log('生成完成: test-map.html');
console.log('文件大小:', Math.round(html.length/1024), 'KB');

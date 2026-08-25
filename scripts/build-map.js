const fs = require('fs');

// 读取资源
const echarts = fs.readFileSync('map/echarts-master/dist/echarts.min.js', 'utf8');
const geoJson = fs.readFileSync('archive/extracted_resources/china-geo-clean.json', 'utf8');

// 省份数据（根据用户提供的最新名单更新 - 11省52家企业）
const provinceData = {
  '山东': {
    color: '#3a6ff7',
    level: 'TOP1',
    summary: '10家企业，是水表产业最集聚的省份，涵盖智能水表、远传抄表、物联网解决方案等全产业链。',
    companies: ['济南合诚', '济南瑞泉电子', '山东科德电子', '泰安轻松表计', '威海市天罡仪表', '青岛积成电子', '山东晨晖电子', '山东潍微科技', '临沂汇泉仪表', '临沂市贝泉水表']
  },
  '四川': {
    color: '#24b7d9',
    level: 'TOP2',
    summary: '7家企业，成都形成水表整机、物联网水表与智慧水务企业群，是西南水表产业重镇。',
    companies: ['成都汇锦智慧', '成都千嘉科技', '成都秦川物联网', '四川府星仪表', '四川精智仪表', '成都市三宇仪表', '成都华信万通']
  },
  '浙江': {
    color: '#43c59e',
    level: 'TOP3',
    summary: '6家企业，宁波水表集团为行业龙头，杭州、宁波形成双核心区域，浙江水表产业实力雄厚。',
    companies: ['宁波水表（宁水集团）', '宁波东海集团', '浙江正泰仪器仪表', '杭州水表', '杭州山科智能', '杭州竞达电子']
  },
  '江苏': {
    color: '#43c59e',
    level: 'TOP3',
    summary: '6家企业，江苏作为制造业大省，连云港、南京形成产业集群，在智能水表和物联网计量领域具备产业配套优势。',
    companies: ['迈拓仪表', '连云港水表', '连云港宇航水表', '江苏赛达电子', '江苏丙辰电子', '江苏博思达智能科技']
  },
  '河北': {
    color: '#8e7cc3',
    level: 'TOP5',
    summary: '5家企业，汇中仪表为热量表龙头兼营智能水表，地理位置靠近京津市场，具备区位优势。',
    companies: ['汇中仪表', '廊坊德能智能仪表', '河北道成电子', '河北巨灵仪表', '河北西比克智能测控']
  },
  '河南': {
    color: '#f39c12',
    level: 'TOP6',
    summary: '4家企业，新天科技、汉威科技为上市公司，在智能仪表、物联网水表领域具备技术优势。',
    companies: ['新天科技', '汉威科技', '河南丰博智能水联网', '河南新宇智能科技']
  },
  '重庆': {
    color: '#f39c12',
    level: 'TOP6',
    summary: '4家企业，集中仪表制造、智慧水务与物联网方案能力，与四川形成川渝产业带。',
    companies: ['重庆西美仪器仪表', '重庆信驰科技', '重庆智慧水务（爱克能）', '重庆渝城水表']
  },
  '湖南': {
    color: '#e74c3c',
    level: 'TOP8',
    summary: '3家企业，湖南常德牌水表等企业形成中部地区水表产业节点。',
    companies: ['湖南常德牌水表', '湖南双佳水务', '湖南中屹智造']
  },
  '陕西': {
    color: '#e74c3c',
    level: 'TOP8',
    summary: '3家企业，陕西米特智能科技等企业在西北地区形成水表产业布局。',
    companies: ['陕西米特智能科技', '陕西大华智能仪表', '陕西宏元电子']
  },
  '江西': {
    color: '#95a5a6',
    level: 'TOP10',
    summary: '2家企业，三川智慧为NB-IoT水表行业领军企业，在物联网智能水表领域技术领先。',
    companies: ['三川智慧', '江西百川水表']
  },
  '安徽': {
    color: '#95a5a6',
    level: 'TOP10',
    summary: '2家企业，安徽在智能仪表和新型科技领域形成新兴产业节点。',
    companies: ['安徽汉威电子', '安徽新正洋科技']
  }
};

// 生成地图数据（11个省份）
const mapData = Object.keys(provinceData).map(name => ({
  name: name,
  itemStyle: { areaColor: provinceData[name].color }
}));

// 生成完整的HTML
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>海思Cat.1重点水表客户分布（测试版）</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            width: 100%;
            max-width: 1680px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
            padding: 40px;
        }
        .page-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 40px;
            margin-bottom: 8px;
        }
        .page-title {
            font-size: 28px;
            font-weight: bold;
            color: #333;
        }
        .kpi-group {
            display: flex;
            align-items: center;
            gap: 24px;
            padding-top: 4px;
        }
        .kpi-item {
            font-size: 16px;
            color: #667eea;
            font-weight: 600;
            white-space: nowrap;
        }
        .kpi-sep {
            color: #ccc;
        }
        .page-subtitle {
            margin: 8px 0 24px;
            color: #888;
            font-size: 15px;
            line-height: 1.6;
        }
        .map-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 360px;
            gap: 24px;
            height: 620px;
        }
        .map-panel {
            width: 100%;
            height: 100%;
            background: #f8f9fa;
            border: 1px solid #e0e6ed;
            border-radius: 12px;
            padding: 15px;
            position: relative;
        }
        #map {
            width: 100%;
            height: 100%;
        }
        .detail-panel {
            height: 100%;
            background: #ffffff;
            border: 1px solid #e0e6ed;
            border-radius: 12px;
            padding: 26px 24px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .province-name {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 6px;
        }
        .level-badge {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .summary {
            font-size: 13px;
            line-height: 1.7;
            color: #666;
            margin-bottom: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid #e0e6ed;
        }
        .company-title {
            font-size: 15px;
            font-weight: bold;
            color: #333;
            margin-bottom: 12px;
        }
        .company-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 12px;
        }
        .company-item {
            padding: 9px 11px;
            background: #f8f9fa;
            border-radius: 6px;
            font-size: 13px;
            color: #555;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: background 0.2s;
        }
        .company-item:hover {
            background: #e9ecef;
        }
        .footer-note {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e0e6ed;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        @media (max-width: 1400px) {
            .map-layout {
                grid-template-columns: minmax(0, 1fr) 320px;
                gap: 20px;
            }
            .detail-panel {
                padding: 20px 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="page-header">
            <h1 class="page-title">海思Cat.1重点水表客户分布</h1>
            <div class="kpi-group">
                <span class="kpi-item">6个集聚区</span>
                <span class="kpi-sep">｜</span>
                <span class="kpi-item">11个重点省份</span>
                <span class="kpi-sep">｜</span>
                <span class="kpi-item">52家目标企业</span>
            </div>
        </div>
        <div class="page-subtitle">
            聚焦水表整表厂、方案商及智慧水务企业，识别海思Cat.1优先推广区域。
        </div>
        <div class="map-layout">
            <div class="map-panel">
                <div id="map"></div>
            </div>
            <div class="detail-panel" id="panel">
                <div class="province-name">省份详情</div>
                <p style="color: #999; font-size: 14px; margin-top: 8px;">点击地图上的重点省份查看详情</p>
            </div>
        </div>
        <div class="footer-note">
            注：本页面产业集聚区为基于CRM客户记录与公开企业资料形成的调研分区，不代表国家或地方政府认定的官方产业集群。
        </div>
    </div>

    <script>
        // === ECharts Library ===
        ${echarts}

        // === China GeoJSON + Map Logic ===
        (function() {
            const chinaGeoJson = ${geoJson};
            echarts.registerMap('china', chinaGeoJson);

            const provinceData = ${JSON.stringify(provinceData, null, 12)};

            const mapData = ${JSON.stringify(mapData, null, 12)};

            const chart = echarts.init(document.getElementById('map'));

            chart.setOption({
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    textStyle: {
                        color: '#333',
                        fontSize: 14
                    },
                    formatter: function(params) {
                        if (provinceData[params.name]) {
                            const info = provinceData[params.name];
                            return '<strong style="font-size: 16px;">' + params.name + '</strong><br/>' +
                                   '<span style="color: #667eea;">' + info.level + '</span><br/>' +
                                   '<span style="color: #666;">企业数: ' + info.companies.length + '</span>';
                        }
                        return params.name;
                    }
                },
                series: [{
                    type: 'map',
                    map: 'china',
                    roam: false,
                    layoutCenter: ['50%', '51%'],
                    layoutSize: '115%',
                    data: mapData,
                    label: {
                        show: false,
                        color: '#333',
                        fontSize: 12
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1.5,
                        areaColor: '#e0e0e0'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 'bold'
                        },
                        itemStyle: {
                            areaColor: '#ffb24a',
                            borderColor: '#ff9500',
                            borderWidth: 2
                        }
                    },
                    select: {
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 'bold'
                        },
                        itemStyle: {
                            areaColor: '#ff9e3f',
                            borderColor: '#ff6b00',
                            borderWidth: 2
                        }
                    }
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
                    '<div class="company-list">' +
                    info.companies.map(c => '<div class="company-item">' + c + '</div>').join('') +
                    '</div>';
            }

            chart.on('click', (params) => {
                if (provinceData[params.name]) {
                    renderPanel(params.name);
                }
            });

            renderPanel('山东');
            chart.dispatchAction({ type: 'select', name: '山东' });

            window.addEventListener('resize', () => chart.resize());
        })();
    </script>
</body>
</html>`;

// 输出到 archive/temp_html/
fs.writeFileSync('archive/temp_html/test-map.html', html, 'utf8');

console.log('✓ test-map.html 已更新（新排版：顶部一行+72%地图+28%详情+两列企业列表）');
console.log('✓ 11省份 · 52家企业');
console.log('✓ 文件位置: archive/temp_html/test-map.html');

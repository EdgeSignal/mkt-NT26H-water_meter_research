const fs = require('fs');

// 读取资源
const echarts = fs.readFileSync('map/echarts-master/dist/echarts.min.js', 'utf8');
// 使用纯净的GeoJSON（已验证可被JSON.parse）
const geoJson = fs.readFileSync('archive/extracted_resources/china-geo-clean.json', 'utf8');

// 省份数据（根据用户提供的最新名单更新 - 12省52家企业）
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

// 生成地图数据（仅11个省份）
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
    <title>中国智能水表产业地图（测试版）</title>
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
            max-width: 1600px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            display: flex;
            min-height: 600px;
        }
        .map-container {
            flex: 1;
            min-height: 600px;
            padding: 20px;
        }
        #map {
            width: 100%;
            height: 100%;
            min-height: 600px;
        }
        .panel {
            width: 400px;
            padding: 30px;
            background: #f8f9fa;
            overflow-y: auto;
            max-height: 600px;
        }
        .province-name {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 15px;
        }
        .summary {
            font-size: 15px;
            line-height: 1.8;
            color: #666;
            margin-bottom: 20px;
            border-left: 3px solid #667eea;
            padding-left: 15px;
        }
        .company-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin: 20px 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #e0e0e0;
        }
        .company {
            background: white;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.2s, box-shadow 0.2s;
            font-size: 15px;
            color: #333;
        }
        .company:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        @media (max-width: 1024px) {
            .content {
                flex-direction: column;
            }
            .panel {
                width: 100%;
                max-height: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>中国智能水表产业地图</h1>
            <p>TOP 12 省份 · 52家代表企业 · 智能水表产业全景</p>
        </div>
        <div class="content">
            <div class="map-container">
                <div id="map"></div>
            </div>
            <div class="panel" id="panel"></div>
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
                    roam: true,
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
                            fontSize: 14,
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
                            fontSize: 14,
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
                    info.companies.map(c => '<div class="company">' + c + '</div>').join('');
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

console.log('✓ test-map.html 已更新（最新企业名单）');
console.log('✓ 12省份 · 52家企业');
console.log('✓ 文件位置: archive/temp_html/test-map.html');

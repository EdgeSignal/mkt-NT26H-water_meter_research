const fs = require('fs');

// 读取资源
const echarts = fs.readFileSync('map/echarts-master/dist/echarts.min.js', 'utf8');
const geoJson = fs.readFileSync('archive/extracted_resources/china-geo-clean.json', 'utf8');

// 省份数据（与test-map.html一致）
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

// 生成深色科技风格的地图section（适配原有样式）
const mapSection = `
        <!-- Slide 2.5: 中国智能水表产业地图 -->
        <section class="slide">
            <!-- 顶部标题+统计数字（一行） -->
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 40px; margin-bottom: 8px;">
                <h2 style="margin: 0; font-size: 26px;">海思Cat.1重点水表客户分布</h2>
                <div style="display: flex; align-items: center; gap: 20px; padding-top: 4px;">
                    <span style="font-size: 15px; color: #00ffff; font-weight: 600; white-space: nowrap;">6个集聚区</span>
                    <span style="color: #555;">｜</span>
                    <span style="font-size: 15px; color: #00ffff; font-weight: 600; white-space: nowrap;">11个重点省份</span>
                    <span style="color: #555;">｜</span>
                    <span style="font-size: 15px; color: #00ffff; font-weight: 600; white-space: nowrap;">52家目标企业</span>
                </div>
            </div>

            <!-- 副标题 -->
            <div style="margin: 6px 0 20px; color: rgba(255, 255, 255, 0.5); font-size: 14px;">
                聚焦水表整表厂、方案商及智慧水务企业，识别海思Cat.1优先推广区域。
            </div>

            <!-- 地图+详情面板（72% + 28%） -->
            <div style="display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 24px; height: 620px;">
                <!-- 地图容器 -->
                <div style="position: relative; background: rgba(14, 40, 69, 0.3); border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 15px; padding: 15px;">
                    <div id="mapDark" style="width: 100%; height: 100%;"></div>
                </div>
                <!-- 详情面板 -->
                <div id="panelDark" style="background: rgba(14, 40, 69, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 15px; padding: 26px 24px; overflow: hidden; color: #e0e7f1;">
                    <h3 style="color: #00ffff; margin-bottom: 10px; font-size: 20px;">省份详情</h3>
                    <p style="color: #808080; font-size: 14px;">点击地图上的重点省份查看详情</p>
                </div>
            </div>

            <!-- 底部说明 -->
            <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); font-size: 11px; color: #666; text-align: center; width: 90%;">
                注：本页面产业集聚区为基于CRM客户记录与公开企业资料形成的调研分区，不代表国家或地方政府认定的官方产业集群。
            </div>
        </section>
`;

// 生成CSS（适配深色科技风格）
const mapCSS = `
        /* 地图面板样式 - 深色科技风格 */
        #panelDark .province-name {
            font-size: 24px;
            font-weight: bold;
            color: #00ffff;
            margin-bottom: 6px;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        #panelDark .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #00ffff, #00d4ff);
            color: #0a0e1a;
            padding: 3px 9px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 12px;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        #panelDark .summary {
            color: #b0c2d4;
            line-height: 1.6;
            margin-bottom: 14px;
            font-size: 13px;
        }
        #panelDark .company-title {
            color: #00ffff;
            font-size: 14px;
            font-weight: bold;
            margin: 14px 0 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        #panelDark .company-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px 10px;
        }
        #panelDark .company-item {
            background: rgba(5, 20, 37, 0.6);
            border: 1px solid rgba(0, 255, 255, 0.12);
            border-radius: 6px;
            padding: 0 10px;
            height: 42px;
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #dfeaf5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: border-color 0.25s;
        }
        #panelDark .company-item:hover {
            border-color: rgba(0, 255, 255, 0.45);
        }
`;

// 生成地图JS逻辑
const mapJS = `<script>
        // === ECharts Library ===
        ${echarts}

        // === China GeoJSON + Map Logic ===
        // 中国智能水表产业地图 - 深色科技风格
        (function() {
            const chinaGeoJson = ${geoJson};
            echarts.registerMap('china', chinaGeoJson);

            const provinceData = ${JSON.stringify(provinceData, null, 12)};

            const mapData = Object.keys(provinceData).map(name => ({
                name: name,
                itemStyle: { areaColor: provinceData[name].color }
            }));

            const chart = echarts.init(document.getElementById('mapDark'));

            chart.setOption({
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    borderColor: 'rgba(0, 255, 255, 0.5)',
                    borderWidth: 1,
                    padding: [10, 15],
                    textStyle: { color: '#00ffff', fontSize: 13 },
                    formatter: (params) => {
                        const info = provinceData[params.name];
                        if (!info) return '';
                        return '<b style=\"font-size:15px;color:#00ffff\">' + params.name + '</b><br/>' +
                               '<span style=\"color:#00d4ff\">' + info.level + ' · ' + info.companies.length + '家企业</span><br/>' +
                               '<span style=\"color:#69d2e7\">点击查看详情 →</span>';
                    }
                },
                series: [{
                    type: 'map',
                    map: 'china',
                    roam: false,
                    selectedMode: 'single',
                    layoutCenter: ['50%', '51%'],
                    layoutSize: '115%',
                    data: mapData,
                    itemStyle: {
                        areaColor: '#1a2744',
                        borderColor: 'rgba(0, 255, 255, 0.3)',
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '#00ffff',
                            borderColor: '#00d4ff',
                            borderWidth: 1.5,
                            shadowBlur: 15,
                            shadowColor: 'rgba(0, 255, 255, 0.5)'
                        },
                        label: {
                            show: true,
                            color: '#0a0e1a',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    select: {
                        itemStyle: {
                            areaColor: '#00d4ff',
                            borderColor: '#fff',
                            borderWidth: 2,
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 255, 255, 0.7)'
                        },
                        label: {
                            show: true,
                            color: '#0a0e1a',
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

                const panel = document.getElementById('panelDark');
                panel.innerHTML =
                    '<div class=\"province-name\">' + name + '</div>' +
                    '<span class=\"level-badge\">' + info.level + '</span>' +
                    '<div class=\"summary\">' + info.summary + '</div>' +
                    '<div class=\"company-title\">代表企业 (' + info.companies.length + ')</div>' +
                    '<div class=\"company-list\">' +
                    info.companies.map(c => '<div class=\"company-item\">' + c + '</div>').join('') +
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
`;

// 保存组件
fs.writeFileSync('map-section-dark.txt', mapSection);
fs.writeFileSync('map-css-dark.txt', mapCSS);
fs.writeFileSync('map-js-dark.txt', mapJS);

console.log('深色科技风格地图组件已生成');
console.log('- map-section-dark.txt (HTML)');
console.log('- map-css-dark.txt (CSS)');
console.log('- map-js-dark.txt (JS + ECharts + GeoJSON)');
console.log('');
console.log('JS文件大小:', Math.round((echarts.length + mapJS.length + geoJson.length) / 1024), 'KB');

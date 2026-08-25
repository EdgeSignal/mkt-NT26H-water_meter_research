const fs = require('fs');

// 读取资源
const echarts = fs.readFileSync('map/echarts-master/dist/echarts.min.js', 'utf8');
const geoJson = fs.readFileSync('archive/extracted_resources/china-geo-clean.json', 'utf8');

// 省份数据（与test-map.html一致）
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

// 生成深色科技风格的地图section（适配原有样式）
const mapSection = `
        <!-- Slide 2.5: 中国智能水表产业地图 -->
        <section class="slide">
            <h2 style="margin-bottom: 30px;">中国智能水表产业地图</h2>
            <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 25px; height: calc(100% - 100px);">
                <div style="position: relative; background: rgba(14, 40, 69, 0.3); border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 15px; padding: 15px;">
                    <div id="mapDark" style="width: 100%; height: 100%;"></div>
                </div>
                <div id="panelDark" style="background: rgba(14, 40, 69, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 15px; padding: 25px; overflow-y: auto; color: #e0e7f1;">
                    <h3 style="color: #00ffff; margin-bottom: 15px; font-size: 22px;">省份详情</h3>
                    <p style="color: #808080; font-size: 16px;">点击地图上的重点省份查看详情</p>
                </div>
            </div>
        </section>
`;

// 生成CSS（适配深色科技风格）
const mapCSS = `
        /* 地图面板样式 - 深色科技风格 */
        #panelDark .province-name {
            font-size: 28px;
            font-weight: bold;
            color: #00ffff;
            margin-bottom: 8px;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        #panelDark .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #00ffff, #00d4ff);
            color: #0a0e1a;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 15px;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        #panelDark .summary {
            color: #b0c2d4;
            line-height: 1.7;
            margin-bottom: 18px;
            font-size: 14px;
        }
        #panelDark .company-title {
            color: #00ffff;
            font-size: 15px;
            font-weight: bold;
            margin: 18px 0 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        #panelDark .company {
            background: rgba(5, 20, 37, 0.6);
            border: 1px solid rgba(0, 255, 255, 0.15);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            transition: all 0.3s;
        }
        #panelDark .company:hover {
            border-color: rgba(0, 255, 255, 0.5);
            transform: translateX(5px);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
        #panelDark .company-name {
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 8px;
        }
        #panelDark .company-city {
            display: none;
        }
        #panelDark .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        #panelDark .tag {
            background: rgba(0, 255, 255, 0.15);
            color: #00d4ff;
            padding: 2px 7px;
            border-radius: 4px;
            font-size: 10px;
            border: 1px solid rgba(0, 255, 255, 0.2);
        }
`;

// 生成地图JS逻辑
const mapJS = `
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
                    info.companies.map(c =>
                        '<div class=\"company\">' +
                            '<div class=\"company-name\">' + c.name + '</div>' +
                            '<div class=\"company-city\">' + c.city + '</div>' +
                            '<div class=\"tags\">' + c.tags.map(t => '<span class=\"tag\">' + t + '</span>').join('') + '</div>' +
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
        })();
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

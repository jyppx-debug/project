// custom.js: 新增模块的动态交互与高级可视化效果

// 熬夜对第二天的影响（雷达图）
var chart7 = echarts.init(document.getElementById('chart7'));
chart7.setOption({
    title: { text: '熬夜对第二天的影响' },
    tooltip: {},
    radar: {
        indicator: [
            { name: '注意力下降', max: 100 },
            { name: '情绪波动', max: 100 },
            { name: '记忆力下降', max: 100 },
            { name: '身体疲劳', max: 100 },
            { name: '精神亢奋', max: 100 }
        ]
    },
    series: [{
        name: '影响',
        type: 'radar',
        data: [{
            value: [80, 70, 60, 90, 50],
            name: '熬夜对第二天的影响'
        }]
    }]
});

// 熬夜后出现的状况（倒金字塔图）
var chart8 = echarts.init(document.getElementById('chart8'));
chart8.setOption({
    title: { text: '熬夜后出现的状况' },
    tooltip: {},
    dataset: {
        source: [
            ['状况', '人数'],
            ['皮肤变差', 80],
            ['脱发', 60],
            ['视力下降', 50],
            ['记忆力下降', 40],
            ['其他', 20]
        ]
    },
    xAxis: {
        type: 'value',
        inverse: true,
    },
    yAxis: {
        type: 'category',
        data: ['皮肤变差', '脱发', '视力下降', '记忆力下降', '其他'],
        inverse: true
    },
    series: [{
        type: 'bar',
        encode: { x: '人数', y: '状况' },
        label: {
            show: true,
            position: 'right'
        }
    }]
});

// 减少熬夜频率的方法（极坐标柱状图）
var chart9 = echarts.init(document.getElementById('chart9'));
chart9.setOption({
    title: { text: '减少熬夜频率的方法' },
    angleAxis: {
        type: 'category',
        data: ['规律作息', '减少压力', '远离电子设备', '健康饮食', '运动锻炼']
    },
    radiusAxis: {},
    polar: {},
    series: [{
        type: 'bar',
        data: [80, 70, 60, 90, 85],
        coordinateSystem: 'polar',
        label: {
            show: true,
            position: 'middle',
            formatter: '{c}%'
        }
    }]
});
// 读取CSV文件并在回调中绘制所有图表
function loadAndVisualizeData() {
    Papa.parse('data.csv', {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            drawChart1(data);
            drawChart2(data);
            drawChart3(data);
            drawChart4(data);
            drawChart5(data);
            drawChart6(data);
            drawMainChart(data);
        }
    });
}

// 图表1：性别分布饼图
function drawChart1(data) {
    const genderCount = {};
    data.forEach(row => {
        const gender = row['Q1您的性别: *'];
        genderCount[gender] = (genderCount[gender] || 0) + 1;
    });

    const chart = echarts.init(document.getElementById('chart1'));
    const option = {
        title: {
            text: '受访者性别分布',
            show: false
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
                color: '#ccc'
            },
            data: Object.entries(genderCount).map(([name, value]) => ({ name, value }))
        }]
    };
    chart.setOption(option);
}

// 图表2：学历分布柱状图
function drawChart2(data) {
    const educationCount = {};
    data.forEach(row => {
        const education = row['Q2.您的学历: *'];
        educationCount[education] = (educationCount[education] || 0) + 1;
    });

    const chart = echarts.init(document.getElementById('chart2'));
    const option = {
        title: {
            text: '受访者学历分布',
            show: false
        },
        grid: {
            top: '5%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: Object.keys(educationCount),
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: '#ccc'
            },
            itemStyle: {
                color: function (params) {

                    color = {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: "#1588D1" // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: "#0F4071" // 100% 处的颜色
                        }
                        ]
                    }

                    return color;
                },
            },
            data: Object.values(educationCount)
        }  
    ]
    };
    chart.setOption(option);
}

// 图表3：睡觉时间分布
function drawChart3(data) {
    const sleepTimeCount = {};
    data.forEach(row => {
        const sleepTime = row['Q5.您通常几点上床睡觉: *'];
        sleepTimeCount[sleepTime] = (sleepTimeCount[sleepTime] || 0) + 1;
    });

    const chart = echarts.init(document.getElementById('chart3'));
    const option = {
        title: {
            text: '睡觉时间分布',
            show: false
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            top: '5%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        xAxis: {
            type: 'category',
            data: Object.keys(sleepTimeCount),
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'line',
            smooth: true,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: '#ccc'
            },
            areaStyle: {
                color: '#0c2d4f'
            },
            data: Object.values(sleepTimeCount)
        }]
    };
    chart.setOption(option);
}

// 图表4：熬夜频率与专业关系
function drawChart4(data) {
    const majorStayUp = {};
    data.forEach(row => {
        const major = row['Q4 您的专业所属类别 *'];
        const frequency = row['Q7若24:00以后睡算熬夜，您一周（7天）熬夜几次: *'];
        if (!majorStayUp[major]) {
            majorStayUp[major] = {};
        }
        majorStayUp[major][frequency] = (majorStayUp[major][frequency] || 0) + 1;
    });

    const chart = echarts.init(document.getElementById('chart4'));
    const option = {
        title: {
            text: '各专业熬夜频率分布',
            show: false
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '1%',
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            type: 'category',
            data: ['0 - 1 次', '2 - 3 次', '3 - 5 次', '6 次及以上'],
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: Object.entries(majorStayUp).map(([major, freq]) => ({
            name: major,
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: '#ccc'
            },
            data: ['0 - 1 次', '2 - 3 次', '3 - 5 次', '6 次及以上'].map(f => freq[f] || 0)
        }))
    };
    chart.setOption(option);
}

// 图表5：熬夜活动词云图
function drawChart5(data) {
    const activities = {};
    data.forEach(row => {
        const acts = JSON.parse(row['Q8您熬夜的时候大多数情况下在干什么?（）  *【最多选3项】'].replace(/'/g, '"'));
        acts.forEach(act => {
            activities[act] = (activities[act] || 0) + 1;
        });
    });

    const chart = echarts.init(document.getElementById('chart5'));
    const option = {
        title: {
            text: '熬夜活动词云',
            show: false
        },
        series: [{
            type: 'wordCloud',
            data: Object.entries(activities).map(([name, value]) => ({
                name,
                value
            })),
            textStyle: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255)
                    ].join(',') + ')';
                }
            }
        }]
    };
    chart.setOption(option);
}

// 图表6：熬夜影响散点图
function drawChart6(data) {
    const effects = {};
    data.forEach(row => {
        const effs = JSON.parse(row['Q10 您认为熬夜对第二天的影响有哪些（）  *【最多选3项】'].replace(/'/g, '"'));
        effs.forEach(eff => {
            effects[eff] = (effects[eff] || 0) + 1;
        });
    });

    const chart = echarts.init(document.getElementById('chart6'));
    const option = {
        title: {
            text: '熬夜影响统计',
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: '5%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'scatter',
            data: Object.entries(effects).map(([name, value], index) => ({
                name,
                value: [index, value]
            }))
        }]
    };
    chart.setOption(option);
}

// 添加主图表绘制函数
function drawMainChart(data) {
    const chart = echarts.init(document.getElementById('main'));

    // 统计熬夜时间段的人数
    const timeDistribution = {};
    data.forEach(row => {
        const time = row['Q5.您通常几点上床睡觉: *'];
        timeDistribution[time] = (timeDistribution[time] || 0) + 1;
    });

    // 统计熬夜频率
    const frequencyDistribution = {};
    data.forEach(row => {
        const freq = row['Q7若24:00以后睡算熬夜，您一周（7天）熬夜几次: *'];
        frequencyDistribution[freq] = (frequencyDistribution[freq] || 0) + 1;
    });

    // 统计主要熬夜原因
    const reasonCount = {};
    data.forEach(row => {
        const reasons = JSON.parse(row['Q9您熬夜的主要原因有哪些:（）  *【最多选3项】'].replace(/'/g, '"'));
        reasons.forEach(reason => {
            reasonCount[reason] = (reasonCount[reason] || 0) + 1;
        });
    });

    const option = {
        title: {
            text: '熬夜情况综合分析',
            subtext: '时间分布-频率-原因分析',
            left: 'center',
            textStyle: {
                color: '#fff'
            },
            subtextStyle: {
                color: '#ccc'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: [
            { x: '10%', y: '15%', width: '35%', height: '35%' },
            { x: '55%', y: '15%', width: '35%', height: '35%' },
            { x: '10%', y: '60%', width: '80%', height: '35%' }
        ],
        xAxis: [
            {
                gridIndex: 0,
                type: 'category',
                data: Object.keys(timeDistribution),
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 1,
                type: 'category',
                data: Object.keys(frequencyDistribution),
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'category',
                data: Object.keys(reasonCount),
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                gridIndex: 0, type: 'value', axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
            },
            {
                gridIndex: 1, type: 'value', axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
            },
            {
                gridIndex: 2, type: 'value', axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
            }
        ],
        series: [
            {
                name: '睡觉时间分布',
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    color: '#ccc'
                },
                data: Object.values(timeDistribution),
                itemStyle: {
                    color: '#91cc75'
                }
            },
            {
                name: '熬夜频率分布',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                label: {
                    show: true,

                },
                data: Object.values(frequencyDistribution),
                itemStyle: {
                    color: '#fac858'
                }
            },
            {
                name: '熬夜原因分布',
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                label: {
                    show: true,

                },
                data: Object.values(reasonCount),
                itemStyle: {
                    color: '#ee6666'
                }
            }
        ]
    };

    chart.setOption(option);
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadAndVisualizeData);

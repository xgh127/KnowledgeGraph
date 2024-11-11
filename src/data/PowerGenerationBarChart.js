import React, { useState, useEffect } from 'react';
import { Card, Select } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// 为每个站点生成一个固定的颜色
const stationColors = {
    '五街': '#ff4757',
    '仙人洞': '#1e90ff',
    '关岭新铺': '#2ed573',
    '北大村': '#ffc107',
    '大莫古': '#ff69b4',
    '小白龙': '#9c27b0',
    '小西村': '#00bcd4',
    '秀田': '#2196f3',
    '红土坡': '#9e9e9e',
    '老青山': '#607d8b'
};

// 数据转换函数
const transformData = (data) => {
    const dataMap = {};

    data.forEach(item => {
        const { name, year, month, total_power_generated } = item;
        const timeKey = `${year}-${String(month).padStart(2, '0')}`;

        if (!dataMap[name]) {
            dataMap[name] = {};
        }

        if (!dataMap[name][timeKey]) {
            dataMap[name][timeKey] = {
                time: timeKey,
                total_power_generated: 0
            };
        }

        dataMap[name][timeKey].total_power_generated += total_power_generated;
    });

    return Object.keys(dataMap).map(stationName => ({
        name: stationName,
        data: Object.values(dataMap[stationName]).map(item => ({
            time: item.time,
            total_power_generated: item.total_power_generated,
            color: stationColors[stationName] // 使用固定颜色
        }))
    }));
};

const PowerGenerationBarChart = ({ data }) => {
    const [selectedStation, setSelectedStation] = useState(Object.keys(stationColors)[0]); // 默认选中的站点
    const transformedData = transformData(data);

    const handleStationChange = (value) => {
        setSelectedStation(value);
    };

    const selectedData = transformedData.find(
        item => item.name === selectedStation
    )?.data || [];

    return (
        <Card title="发电量月度统计">
            <Select
                style={{ marginBottom: 16, width: '100%' }}
                placeholder="选择发电厂"
                defaultValue={selectedStation}
                onChange={handleStationChange}
            >
                {Object.keys(stationColors).map(name => (
                    <Select.Option key={name} value={name}>
                        {name}
                    </Select.Option>
                ))}
            </Select>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_power_generated" fill={stationColors[selectedStation]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PowerGenerationBarChart;
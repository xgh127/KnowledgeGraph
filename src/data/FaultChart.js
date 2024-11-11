import React, { useState, useEffect } from 'react';
import { Card, Select } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// 为每个站点预定义颜色
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
    const dataMap = new Map();

    data.forEach(item => {
        const { name, year, month, fault_count } = item;
        const timeKey = `${year}-${month.toString().padStart(2, '0')}`;
        if (!dataMap.has(name)) {
            dataMap.set(name, []);
        }
        dataMap.get(name).push({
            time: timeKey,
            fault_count,
        });
    });

    return Array.from(dataMap).map(([stationName, stationData]) => ({
        name: stationName,
        data: stationData,
        color: stationColors[stationName] // 为每个站点分配颜色
    }));
};

const FaultChart = ({ data }) => {
    const [selectedStation, setSelectedStation] = useState('北大村'); // 默认选中的站点
    const transformedData = transformData(data);

    const handleStationChange = (value) => {
        setSelectedStation(value);
    };

    const selectedData = transformedData.find(item => item.name === selectedStation)?.data || [];

    return (
        <Card title="故障次数统计">
            <Select
                style={{ marginBottom: 16 }}
                defaultValue={selectedStation}
                onChange={handleStationChange}
            >
                {transformedData.map(item => (
                    <Select.Option key={item.name} value={item.name}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: '时间', position: 'bottom', offset: 20 }} />
                    <YAxis label={{ value: '故障次数', angle: -90, position: 'left', offset: 0 }} />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="fault_count"
                        fill={transformedData.find(item => item.name === selectedStation)?.color || '#8884d8'}
                        label={{ position: 'top', offset: 10 }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default FaultChart;
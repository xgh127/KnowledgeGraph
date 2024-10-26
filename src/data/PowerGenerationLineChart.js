// PowerGenerationLineChart.js
import React from 'react';
import { Card } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

const PowerGenerationLineChart = ({ data }) => {
    return (
        <Card title="发电量趋势图">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_power_generated" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PowerGenerationLineChart;
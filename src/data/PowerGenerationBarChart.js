// PowerGenerationBarChart.js
import React from 'react';
import { Card } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

const PowerGenerationBarChart = ({ data }) => {
    return (
        <Card title="发电量的月度统计">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_power_generated" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PowerGenerationBarChart;
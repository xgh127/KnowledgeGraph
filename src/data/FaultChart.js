import React from 'react';
import { Card } from 'antd';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

const FaultChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <Card title="故障次数统计">
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* X轴，添加label属性来显示轴说明 */}
                <XAxis dataKey="name" label={{ value: '站点名称', position: 'right',offset: -50, dy: 20,dx: 0 }}>
                    {/* 可以在这里添加刻度标签 */}
                </XAxis>

                {/* Y轴，添加label属性来显示轴说明 */}
                <YAxis label={{ value: '故障次数', angle: -90, position: 'left', offset: 0 }} />
                    {/* 可以在这里添加刻度标签 */}
                <Tooltip />
                <Legend />
                <Bar dataKey="fault_count" fill="#8884d8" label={{ position: 'top', offset: 10 }} />
            </BarChart>
        </Card>
    );
};

export default FaultChart;
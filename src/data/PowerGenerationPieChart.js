// PowerGenerationPieChart.js
import React from 'react';
import { Card } from 'antd';
import {
    PieChart, Pie, Sector, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

const PowerGenerationPieChart = ({ data }) => {
    return (
        <Card title="发电量占比">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total_power_generated"
                        cy={120}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                    >
                        {
                            data.map((entry, index) => (
                                <Sector key={index} />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PowerGenerationPieChart;
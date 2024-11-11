import React from 'react';
import { Card } from 'antd';
import {
    PieChart, Pie, Sector, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

// 数据转换函数，将同一个厂子的发电量数据求和，并为每个厂子分配一个颜色
const transformData = (data) => {
    const dataMap = new Map();
    const colorMap = new Map(); // 用于存储每个厂子的颜色

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FFDD00', '#73C6B6', '#E37222', '#FF6EA7', '#83D8F3']; // 颜色数组

    data.forEach((item, index) => {
        const { name, total_power_generated } = item;
        if (!dataMap.has(name)) {
            dataMap.set(name, 0);
            // 为每个厂子分配一个颜色
            if (colorMap.size < COLORS.length) {
                colorMap.set(name, COLORS[colorMap.size]);
            } else {
                // 如果颜色用完，可以在这里添加更多的颜色或者循环使用
                colorMap.set(name, COLORS[colorMap.size % COLORS.length]);
            }
        }
        dataMap.set(name, dataMap.get(name) + total_power_generated);
    });

    return Array.from(dataMap, ([name, totalPower]) => ({
        name,
        value: totalPower,
        fill: colorMap.get(name) // 为每个厂子的数据添加颜色属性
    }));
};

const PowerGenerationPieChart = ({ data }) => {
    const transformedData = transformData(data);

    return (
        <Card title="发电量占比">
            <ResponsiveContainer width="100%" height={400}> {/* 增加图表高度 */}
                <PieChart>
                    <Pie
                        data={transformedData}
                        dataKey="value"
                        cy={160}
                        innerRadius={100}
                        outerRadius={150}
                        labelLine={false} // 隐藏标签连接线
                        label={renderLabel} // 自定义标签
                    >
                        {transformedData.map((entry, index) => (
                            <Sector
                                key={index}
                                fill={entry.fill} // 使用每个厂子分配的颜色
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

// 自定义标签函数，用于显示每个扇区的百分比
const renderLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(Math.min(2 * Math.PI, midAngle));
    const y = cy + radius * Math.max(-1, Math.sin(midAngle));

    // // 仅显示较大扇区的标签
    // if (percent > 0.05) { // 例如，仅显示超过5%的扇区的标签
    //     return (
    //         <text
    //             x={x}
    //             y={y}
    //             fill="#666"
    //             textAnchor={x > cx ? 'start' : 'end'}
    //             dominantBaseline="central"
    //         >
    //             {`${(percent * 100).toFixed(2)}%`}
    //         </text>
    //     );
    // }
    return null;
};

export default PowerGenerationPieChart;
import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd";
import axios from 'axios';
import FaultTable from "../data/FaultTable";
import FaultChart from "../data/FaultChart";
import PowerGenerationBarChart from "../data/PowerGenerationBarChart";
import PowerGenerationLineChart from "../data/PowerGenerationLineChart";
import PowerGenerationPieChart from "../data/PowerGenerationPieChart"; // 如果使用 axios

export const DataAnalysisView = () => {
    const [FaultData, setFaultData] = useState([]);
    const [PowerData, setPowerData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const handleYearChange = value => setSelectedYear(value);
    const handleMonthChange = value => setSelectedMonth(value);
    useEffect(() => {
        const fetchFaultData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fault_data'); // 调用后端 API
                setFaultData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchPowerData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/power_data'); // 调用后端 API
                setPowerData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchFaultData();
        fetchPowerData();
    }, []);

    return (
        <Content>
            <div style={{ marginLeft: "50px", height: "100%" }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<><h2>故障数据统计</h2></>} key='1'>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<><h3>柱状图</h3></>} key='1'>

                           <FaultChart data={FaultData} />
                            </TabPane>
                            <TabPane tab={<><h3>表格</h3></>} key='2'>
                                <FaultTable
                                    data={FaultData}
                                    selectedYear={selectedYear}
                                    selectedMonth={selectedMonth}
                                    onYearChange={handleYearChange}
                                    onMonthChange={handleMonthChange}
                                />
                            </TabPane>

        </Tabs>
                    </TabPane>

                    <TabPane tab={<><h2>发电量数据统计</h2></>} key='2'>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<><h3>柱状图</h3></>} key='1'>
                                <PowerGenerationBarChart data={PowerData} />
                            </TabPane>
                            <TabPane tab={<><h3>折线图</h3></>} key='2'>
                               <PowerGenerationLineChart     data={PowerData} />
                            </TabPane>
                            <TabPane tab={<><h3>饼图</h3></>} key='3'>
                                <PowerGenerationPieChart data={PowerData} />
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </div>
        </Content>
    );
};